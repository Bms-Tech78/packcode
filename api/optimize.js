// =============================================================
// PackCode — /api/optimize
// Vercel serverless function. Takes user input + target model
// + task, calls Claude Haiku 4.5, returns a rewritten prompt.
// =============================================================

const { buildMetaPrompt } = require('./_meta-prompt.js');

// Free tier limits — per IP per UTC day
const FREE_DAILY_LIMIT = 5;

// In-memory rate limit (resets on cold start — fine for v1)
// For production scale we'd swap this for Upstash Redis or Vercel KV
const rateLimitStore = new Map();

function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    'unknown'
  );
}

function getDayKey(ip) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `${ip}:${today}`;
}

function checkRateLimit(ip, isPro) {
  if (isPro) return { allowed: true, remaining: Infinity };
  const key = getDayKey(ip);
  const used = rateLimitStore.get(key) || 0;
  if (used >= FREE_DAILY_LIMIT) {
    return { allowed: false, remaining: 0, used };
  }
  return { allowed: true, remaining: FREE_DAILY_LIMIT - used, used };
}

function incrementUsage(ip) {
  const key = getDayKey(ip);
  rateLimitStore.set(key, (rateLimitStore.get(key) || 0) + 1);
}

// Rough token estimator (~3.8 chars/token for English+code)
const estTokens = (s) => (s ? Math.ceil(s.length / 3.8) : 0);

module.exports = async function handler(req, res) {
  // CORS — allow our own domain + localhost for dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Pro-Token');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const {
      input = '',
      files = [],
      provider = 'anthropic',
      task = 'auto',
      hasFiles = false,
      hasLongText = false
    } = req.body || {};

    if (!input.trim() && !files.length) {
      return res.status(400).json({ error: 'No input provided' });
    }

    // Soft Pro check (header) — we'll properly wire Stripe later
    const isPro = req.headers['x-pro-token'] === process.env.PRO_DEV_TOKEN;

    // Rate limit
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip, isPro);
    if (!limit.allowed) {
      return res.status(429).json({
        error: 'daily_limit',
        message: `You've used your ${FREE_DAILY_LIMIT} free rewrites today. Upgrade to Pro for unlimited.`,
        used: limit.used,
        limit: FREE_DAILY_LIMIT,
        resetsAt: 'midnight UTC'
      });
    }

    // Build the user payload for the meta-prompt
    // We deliberately compress here too — strip oversized file contents
    // so we never blow past Haiku's context window
    let userPayload = `User request: ${input.trim()}\n\n`;
    if (files.length) {
      const meaningful = files.filter(f => !f.ignored && f.content);
      userPayload += `Attached files (${meaningful.length}):\n`;
      // Truncate each file to keep meta-prompt cost low
      for (const f of meaningful.slice(0, 20)) {
        const snippet = (f.content || '').slice(0, 4000);
        userPayload += `\n--- ${f.name} ---\n${snippet}\n`;
        if (f.content && f.content.length > 4000) userPayload += '...[truncated]\n';
      }
    }

    const systemPrompt = buildMetaPrompt({
      provider,
      task,
      hasFiles: files.length > 0,
      hasLongText: !files.length && input.length > 300
    });

    // Call Anthropic Claude Haiku 4.5
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'config',
        message: 'API key not configured. Add ANTHROPIC_API_KEY to Vercel env.'
      });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPayload }]
      })
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      console.error('Anthropic error:', anthropicRes.status, errBody);
      return res.status(502).json({
        error: 'upstream',
        message: 'AI service returned an error. Try again in a moment.',
        details: anthropicRes.status
      });
    }

    const anthropicJson = await anthropicRes.json();
    const rawText = anthropicJson.content?.[0]?.text || '';

    // Parse Claude's JSON response
    let parsed;
    try {
      // Be defensive — sometimes models wrap JSON in code fences despite instructions
      const cleaned = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/, '')
        .replace(/\s*```\s*$/, '')
        .trim();
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error('Failed to parse model JSON:', rawText.slice(0, 300));
      return res.status(502).json({
        error: 'parse',
        message: 'AI returned an unexpected format. Try again.'
      });
    }

    if (!parsed.prompt) {
      return res.status(422).json({
        error: 'no_prompt',
        message: 'AI could not generate a prompt.',
        warnings: parsed.warnings || []
      });
    }

    // Only count usage AFTER a successful response
    incrementUsage(ip);

    const optimizedTokens = estTokens(parsed.prompt);
    const originalTokens = estTokens(userPayload);

    return res.status(200).json({
      prompt: parsed.prompt,
      improvements: parsed.improvements || [],
      warnings: parsed.warnings || [],
      originalTokens,
      optimizedTokens,
      provider,
      task,
      remaining: limit.remaining - 1,
      limit: FREE_DAILY_LIMIT,
      isPro,
      // For transparency / debugging
      modelUsed: 'claude-haiku-4-5'
    });

  } catch (err) {
    console.error('optimize.js fatal:', err);
    return res.status(500).json({
      error: 'fatal',
      message: 'Something went wrong on our end. Try again.',
      details: err.message
    });
  }
};

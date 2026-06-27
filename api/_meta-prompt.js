// =============================================================
// PackCode — Meta-prompt v3 (token-optimised)
// Every token here gets sent on every API call. Keep it lean.
// =============================================================

// Provider-specific format notes — kept to one tight line each.
const STYLE = {
  anthropic:  `XML: <task><role><input><requirements><output_format><constraints><example>. Claude parses XML natively.`,
  openai:     `Markdown: # Role / # Task / # Input / # Output Format / # Constraints / # Example. Numbered lists for steps.`,
  google:     `Markdown, example-driven. ## Role / ## Goal / ## Input / ## Required Output / ## Example. Show > tell.`,
  xai:        `Plain markdown. Role + task + format + constraints. Conversational OK. Skip ceremony.`,
  deepseek:   `Markdown. If reasoning model: prepend "Think step by step." Be specific on language/framework.`,
  cursor:     `Markdown. File paths in backticks (\`src/x.ts\`). Code blocks with lang hints. List affected files explicitly. Edit vs new files explicit.`,
  v0:         `Markdown, visual-first. ## Component / ## Visual / ## Behavior / ## Variants. Default: React + Tailwind + shadcn/ui. Skip backend.`,
  lovable:    `Markdown, UX-first. ## What the app does / ## Key user flows / ## Visual style / ## Data (if relevant). Don't overspecify stack.`,
  bolt:       `Markdown. ## What to build / ## Stack / ## Pages or Components / ## Behavior. Be explicit: single component vs full app.`,
  perplexity: `Markdown. ## Question / ## Required sources / ## Output format / ## Depth. Demand citations + recency window.`
};

// Task hints — one line each. Claude already knows what "code review" means.
const TASK = {
  build:     `Force role (senior eng). Force single-file/multi-file output spec. Show 2-line example of opening.`,
  review:    `Severity P0-P3. Format: [Pn] file:line — issue. Fix: one-liner. No praise.`,
  bugs:      `Bugs only, no style. Format: BUG: file:line — desc / FIX: minimal patch. Allow "no bugs found".`,
  refactor:  `Preserve behaviour. Full files (no diffs). Bullet list of changes at end.`,
  explain:   `4 sections: Purpose (1 line) / Flow (≤7 steps) / Non-obvious (≤5 bullets) / Mental model (1-2 lines).`,
  tests:     `Conventional framework per language. Cover happy/edge/error. Test files only.`,
  summarize: `TL;DR (1 line) + 3-7 bullets + Takeaway (1 line). No preamble.`,
  translate: `Preserve behaviour exactly. Converted code only + behaviour-diff bullets at end. 2-line conversion example.`,
  auto:      `Detect intent. Prefer tighter format when ambiguous.`
};

// Input context hints — one line each.
const CONTEXT = {
  files:    `User attached files. Their request = what to DO with them. Reference by name; don't restate contents.`,
  longText: `User pasted text. Text = source material; instruction = task to apply.`,
  idea:     `Short request, no attachments. Target AI should build/do this from scratch.`
};

function buildMetaPrompt({ provider, task, hasFiles, hasLongText }) {
  const style = STYLE[provider] || STYLE.openai;
  const taskNote = TASK[task] || TASK.auto;
  const ctx = hasFiles ? CONTEXT.files : hasLongText ? CONTEXT.longText : CONTEXT.idea;

  return `You rewrite rough user requests into sharper, model-native prompts.

TARGET: ${style}
TASK: ${taskNote}
INPUT: ${ctx}

RULES
1. Use target's native format above. Exactly.
2. Open with role assignment.
3. Output format FIRST and SPECIFIC. (Single-code-block / max-N-bullets / no-preamble / no-apologies.) This is the biggest token saver.
4. Add brief "example response opening" (2-4 lines) when it anchors style. Skip if trivial.
5. Strip filler (please, could you, I would like). The AI doesn't need charming.
6. Vague → pick a sensible default and state it.
7. Preserve user intent. Don't add features. Don't drop info.
8. Match user energy (playful → warm; review → clinical).

CLARIFYING QUESTIONS
After the prompt, list 2-4 short questions that would meaningfully change the output if answered. Skip trivial preferences. Empty array if request already specific.

GOOD: "Pygame, Arcade, or Turtle?" / "Errors throw or return null?"
BAD: "What colours?" / "How long?"

OUTPUT
JSON only. No markdown, no fences, no commentary:
{
  "prompt": "<rewritten prompt>",
  "improvements": ["<≤14 words>", "...", "3-5 total"],
  "questions": ["<≤16 words>", "...", "0-4 total"],
  "warnings": ["<only if request is ambiguous/risky>"]
}

If user's input is already excellent: return it verbatim, explain in improvements why.
If dangerous/abusive: prompt:"", reason in warnings.`;
}

module.exports = { buildMetaPrompt };

# PackCode

> Sharper prompts for any AI. Turn any idea, file, or codebase into a token-efficient prompt.

Live at: **[packcode.dev](https://packcode.dev)**

---

## What's in this repo

```
packcode/
├── api/
│   ├── optimize.js         ← Vercel serverless function that calls Claude Haiku 4.5
│   └── _meta-prompt.js     ← The system prompt (token-optimised v3)
├── app/
│   ├── index.html          ← The product app (packcode.dev/app)
│   └── assets/
│       ├── logo-seal-only.png    ← Wax seal icon (header, favicon, intro)
│       └── logo-lockup.png       ← Full lockup (marketing)
├── landing/
│   ├── index.html          ← Marketing site (packcode.dev)
│   ├── terms.html          ← Terms of Service (/terms)
│   ├── privacy.html        ← Privacy Policy (/privacy)
│   └── assets/             ← Same logo files
├── docs/
│   ├── SPEC.md
│   └── ROADMAP.md
├── marketing/
│   └── reddit-launch-plan.md
├── package.json
├── vercel.json             ← Routes / rewrites config
├── .env.example            ← Env vars template
└── .gitignore
```

## Environment variables (Vercel)

Both marked "Sensitive" in Vercel → Settings → Environment Variables:

- `ANTHROPIC_API_KEY` — from console.anthropic.com
- `PRO_DEV_TOKEN` — any random string. Send as `X-Pro-Token` header to bypass rate limits during testing.

## Status

- [x] Backend live at `packcode.dev/api/optimize`
- [x] Claude Haiku 4.5 wired in
- [x] Meta-prompt v3 (token-optimised)
- [x] Wax seal logo across all pages
- [x] Landing page with pricing + waitlist modals
- [x] Legal pages (Terms + Privacy)
- [ ] Frontend app calls the live API (currently uses local mock)
- [ ] Stripe integration (waiting on business account)
- [ ] Real Pro tier activation

## Pricing (planned)

| Tier | Price | Notes |
|---|---|---|
| Free | £0 | 5 rewrites/day |
| Pro | £5.99/mo | Unlimited + presets + priority AI |
| Lifetime | £49 (or £29 for first 100) | Everything, once |

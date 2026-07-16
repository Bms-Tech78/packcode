# PackCode — Product Spec v1

> **One-liner:** Pack your codebase into the perfect AI prompt, in one click.

> **Tagline options:**
> - "Your codebase, AI-ready in seconds."
> - "Stop copy-pasting files into ChatGPT."
> - "The smartest way to feed your code to AI."

---

## 🎯 The Problem

Devs working with Claude / ChatGPT / Cursor / Gemini constantly need to share *parts* of their codebase as context. Current options all suck:

1. **Copy-paste files one by one** → tedious, easy to miss something
2. **Paste entire repo** → blows past token limits, includes junk (node_modules, .git, lockfiles)
3. **CLI tools like Repomix/Repopack** → great but require install, no GUI, no presets, no token budget UI

**Our wedge:** A polished, web-based version with smart defaults, visual token budget, and saved presets.

---

## 👥 Target User

- Solo developers & indie hackers using AI heavily
- Devs using Cursor / Claude Code / Aider who need to share external context
- Tech leads who want to share codebase context with non-technical AI tools
- "AI-native" devs (the ones already paying for ChatGPT Plus + Claude Pro + Cursor)

**Where they hang out:** X/Twitter, r/ChatGPTCoding, r/LocalLLaMA, r/cursor, Hacker News, indie hackers, Discord servers (Cursor, Anthropic builders)

---

## ✨ Features — v1 (MVP, ship in ~10 days)

### Must-have
- [ ] Upload folder OR paste GitHub URL (public repos)
- [ ] Smart auto-ignore (.gitignore, node_modules, build, dist, .next, lockfiles, binaries, images)
- [ ] File tree view with checkboxes — toggle files/folders in/out
- [ ] Live token counter (per file + total) using tiktoken — color-coded vs model limit
- [ ] Model selector (GPT-4o, GPT-5, Claude Sonnet 4.5, Gemini 2.5 Pro) → shows context limit
- [ ] One-click "Copy as prompt" — outputs in clean Markdown format with file tree + contents
- [ ] Output format toggle: Markdown / XML (Claude-style) / Plain
- [ ] Custom instructions field (prepended to output)

### Free vs Pro
| Feature | Free | Pro (£9/mo or £29 one-time) |
|---|---|---|
| Local folder upload | ✅ (up to 50 files) | ✅ Unlimited |
| GitHub public repos | ✅ (1/day) | ✅ Unlimited |
| GitHub private repos | ❌ | ✅ |
| Saved presets | ❌ | ✅ Unlimited |
| Multi-model side-by-side packing | ❌ | ✅ |
| File summarization (AI compresses big files) | ❌ | ✅ |
| CLI tool + API | ❌ | ✅ |
| Team sharing | ❌ | Coming v2 |

### Cut from v1 (build later)
- ~~Team accounts~~
- ~~VS Code extension~~
- ~~Direct push to Claude/ChatGPT~~ (just copy is fine for v1)
- ~~Diff mode~~ (only pack changed files)
- ~~Mobile~~

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind + shadcn/ui
- **Auth:** Clerk (cheapest fast option) or Supabase Auth
- **DB:** Supabase (Postgres) — only needed for Pro users + presets
- **Payments:** Stripe (Checkout + Customer Portal, or Lemon Squeezy for easier tax handling in UK)
- **Tokenizer:** `js-tiktoken` (runs client-side, no API cost)
- **GitHub:** Octokit for public repo fetch, OAuth for private
- **Hosting:** Vercel (free tier fine to start)
- **Domain:** ~£10/yr (.com or .dev)

**Why all client-side processing:** Cheaper (no server compute), faster, and a privacy story you can market ("your code never touches our servers" for the free tier).

---

## 💰 Pricing

- **Free:** Generous enough to be useful, limited enough to convert
- **Pro:** £9/mo OR £29 one-time (lifetime deal) — the one-time option converts trial users fast and gives you a cash spike for marketing
- **Launch deal:** First 100 users get lifetime for £19 (creates urgency, gives social proof)

**Conversion math to hit ~£500/mo:**
- ~55 monthly subscribers, OR
- ~17 lifetime deals/mo, OR
- realistically a mix

---

## 📈 Launch Plan (the fun bit)

### Pre-launch (during build)
- [ ] Build in public on X — daily progress screenshots
- [ ] Tease landing page with email waitlist
- [ ] Post in 2-3 communities to gather pre-launch interest

### Launch week
- [ ] **Day 1:** Soft launch — post to X, personal network, get 10 testers
- [ ] **Day 2:** Show HN ("Show HN: PackCode – pack your codebase for AI")
- [ ] **Day 3:** Reddit — r/ChatGPTCoding, r/cursor, r/ClaudeAI (READ rules, no spam)
- [ ] **Day 4:** Product Hunt launch (Tuesday-Thursday best)
- [ ] **Day 5:** Indie Hackers post — share build + revenue numbers
- [ ] **Day 6-7:** DM 50 people who've tweeted about "context window" / "feeding code to claude"

### Post-launch (ongoing)
- [ ] Weekly "build in public" revenue/user updates on X
- [ ] SEO content: "How to share code with Claude", "Token limits explained", etc.
- [ ] Reply to every tweet about Cursor/Claude pain points with a helpful comment + soft mention

---

## 🎯 Success metrics

- **Week 1:** 200 signups, 5 paying users (£45-145)
- **Month 1:** 1,000 signups, 30 paying users (£270-870)
- **Month 3:** 5,000 signups, 100 paying users (£900-2,900/mo)
- **Apple Dev fee covered:** Within month 1 ✅

---

## ⚠️ Risks & how we beat them

| Risk | Mitigation |
|---|---|
| Repomix already exists | We're web-based, prettier UI, saved presets, free tier — different user (non-CLI devs) |
| Anthropic/OpenAI build this themselves | Stay nimble, niche down to specific workflows (Cursor users, etc.) |
| Low conversion to Pro | Aggressive lifetime deal for first 100, then test prices |
| GitHub rate limits | Cache aggressively, require OAuth past free tier |

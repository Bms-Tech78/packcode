# PackCode — Build Roadmap

**Goal:** Live, paying customers within ~2 weeks.

## 🗓 Week 1 — Build the core

### Day 1 (today) ✅
- [x] Spec locked
- [x] Repo scaffolded
- [x] Landing page draft (this workspace)
- [ ] Buy domain (suggestions: `packcode.dev`, `packcode.app`, `packcontext.com`)
- [ ] Set up X account / start build-in-public thread

### Day 2-3 — Core packing engine
- [ ] Next.js + Tailwind + shadcn setup
- [ ] File upload (drag-drop folder via `webkitdirectory`)
- [ ] Recursive file tree builder
- [ ] Smart ignore rules (default ignore list)
- [ ] Tokenizer integration (`js-tiktoken`)

### Day 4-5 — UI
- [ ] File tree with checkboxes (collapsible)
- [ ] Live token counter w/ model selector
- [ ] Output preview pane
- [ ] Copy to clipboard
- [ ] Format toggle (MD / XML / Plain)

### Day 6-7 — GitHub integration + polish
- [ ] Public repo fetch via URL (Octokit)
- [ ] Custom instructions field
- [ ] Empty states, errors, loading
- [ ] Mobile responsive (at least viewable)

## 🗓 Week 2 — Monetize & launch

### Day 8-9 — Auth + Pro tier
- [ ] Clerk auth (Google + GitHub login)
- [ ] Stripe Checkout (monthly + lifetime)
- [ ] Webhook → grant Pro status
- [ ] Free vs Pro feature gates

### Day 10 — Pro features
- [ ] Saved presets (Supabase)
- [ ] Private GitHub repos (OAuth scope)
- [ ] Remove Free tier limits for Pro users

### Day 11 — Landing page → live
- [ ] Final copy + screenshots/GIFs
- [ ] Plausible analytics
- [ ] Email capture (Loops or ConvertKit free)

### Day 12-14 — LAUNCH 🚀
- [ ] Soft launch to network
- [ ] Show HN
- [ ] Reddit (3 subs, one per day)
- [ ] Product Hunt prep + launch
- [ ] DM outreach

## 🗓 Week 3+ — Iterate based on real users
- Talk to first 20 users — what do they want next?
- Fix top 3 complaints
- Ship "killer feature #2" based on feedback (probably: VS Code extension OR Cursor rules generator)

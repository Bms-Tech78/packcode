# 📣 PackCode — Reddit Launch Plan

> Strategy: launch quietly on Reddit, get first 100-500 users + feedback, iterate, then scale via TikTok creator partnerships.

---

## 🎯 Target subreddits (in priority order)

| Subreddit | Subscribers | Vibe | Strictness |
|---|---|---|---|
| **r/ChatGPTCoding** | ~250k | Devs using AI to code. Bullseye audience. | Medium — must be useful |
| **r/cursor** | ~50k | Cursor users → all hitting context limits | Medium |
| **r/ClaudeAI** | ~200k | Claude power users | Medium |
| **r/LocalLLaMA** | ~400k | Hardcore AI nerds | Strict — no fluff |
| **r/SideProject** | ~250k | Indie hackers — supportive | Loose — easy launch |
| **r/SaaS** | ~200k | Build-in-public crowd | Loose |
| **r/indiehackers** | ~75k | Same vibe as SideProject | Loose |
| **r/webdev** | ~2M | Massive but noisy, save for later | Strict — no promo |

---

## 📋 The golden rules of Reddit launch

Reddit will **destroy you** if you walk in like a marketer. Follow these or get banned.

### DO ✅
- **Read each subreddit's rules** before posting. Some require flair, some ban "Show off your project" outside of weekly threads
- **Lurk for 2-3 days first** — comment helpfully on others' posts to build karma
- **Lead with the problem, not the product**
- **Be honest** — "I built this for myself" lands. "Revolutionary AI-powered solution" gets you downvoted
- **Respond to every comment** in the first 24 hours
- **Share your build process**, screenshots, your stack
- **Mention you're solo/indie** — Reddit loves underdogs
- **Offer it free or with a Reddit discount** — generates goodwill

### DON'T ❌
- ❌ Cross-post the same text to 5 subs in one day (auto-shadowban)
- ❌ Use marketing buzzwords ("disrupt", "revolutionize", "game-changer")
- ❌ Hide that it's your project
- ❌ Beg for upvotes
- ❌ Argue with critics — thank them and ask follow-up questions
- ❌ Link directly to a pricing page — link to a free tool/demo

---

## 🗓 Launch sequence (when MVP is ready)

### Pre-launch (1 week before)
- Make Reddit account if you don't have one (>30 days old + some karma works best — use your real account if you have one)
- Comment helpfully in your target subs to build a footprint
- Watch what gets upvoted in those subs

### Launch week — ONE sub per day, NOT all at once
- **Day 1: r/SideProject** — safest, most welcoming. Title: *"I built PackCode — drop your codebase, get a perfect AI prompt"*
- **Day 2: r/ChatGPTCoding** — main audience. Title: *"Tired of copy-pasting files into Claude — so I built this"*
- **Day 3: r/cursor** — adjacent angle. Title: *"For when you need to share code with Claude/GPT outside of Cursor"*
- **Day 4: r/ClaudeAI** — lead with the XML output format Claude prefers
- **Day 5: r/indiehackers** — share the build journey + early numbers
- **Day 6: r/SaaS** — share the launch retro + metrics

Space them out. Reddit's anti-spam systems flag bursts.

---

## ✍️ Post templates (customize before posting!)

### Template A — r/SideProject post

```
Title: I built PackCode — drop your codebase, get a perfect AI prompt

Hey r/SideProject 👋

Every time I want help from Claude or ChatGPT with my project, I waste
5 minutes copy-pasting files one by one. So I built a thing.

PackCode lets you drop a folder (or paste a GitHub URL) and instantly
get a clean, token-optimized prompt with your code, ready to paste into
any LLM. Smart-ignores node_modules and lockfiles, shows a live token
counter so you don't blow past the context limit.

Live: https://packcode.dev
Free tier — no signup needed for basic use.

Built solo over 2 weekends. Stack: Next.js + Tailwind, all file
parsing runs in your browser (your code never touches my server).

Would love any feedback — especially "this would be useful if..."

Cheers 🙏
```

### Template B — r/ChatGPTCoding post (more problem-focused)

```
Title: Stop copy-pasting files into Claude — small tool I made

We've all done it. You want Claude to debug something, so you start
copy-pasting files. You forget one. Or you paste the whole repo and
hit the context limit. Or you accidentally paste node_modules.

I got fed up and built PackCode (https://packcode.dev):

- Drag a folder in
- It builds a file tree, auto-ignores junk
- Click files on/off
- Live token counter (with model presets — Claude 4.5, GPT-5, Gemini 2.5)
- Click copy → paste into your AI of choice

All client-side, free to use. No signup for basic features.

Honest question for this sub: what's the worst part of feeding code
to AI for you? I want to make this less crap for everyone.
```

### Template C — r/cursor post

```
Title: For sharing code with Claude/GPT when you're outside Cursor

Cursor is great but sometimes I want to chat with Claude/GPT in the
browser about my codebase (debugging, architecture questions, etc.)
and exporting that context is painful.

Made PackCode for it: https://packcode.dev

Drop a folder, pick the files that matter, get them as a clean prompt.

Curious if anyone else hits this issue or if it's just me?
```

---

## 💬 How to handle the comments

Top 5 likely comments and how to respond:

| Comment | Good response |
|---|---|
| "Repomix does this already" | "Yeah Repomix is great! The difference is PackCode is web-based with a visual file picker and token budget. Some folks (myself included) prefer not to install CLIs. Not trying to replace it, more of a different flavor." |
| "What about privacy?" | "Good question — all file parsing happens in your browser, no upload to my server. The README explains it more." |
| "Why not just use [tool X]?" | "Will check it out! Always looking for better options. What do you like about it?" |
| "This is just a wrapper" | "Honestly, yeah — most useful tools are wrappers. The value is in the UX. If a wrapper saves you 5 min a day that's a real win." |
| "I'll wait until it has X feature" | "What's the X feature? Genuinely asking — I'll add it if multiple people want it." |

**Golden rule:** every reply ends with a question. Keeps the thread alive = more visibility = more upvotes = more signups.

---

## 📊 Metrics to track per post

- Upvotes (aim for >50)
- Comments (aim for >20)
- Click-throughs to packcode.dev (check Vercel analytics)
- New waitlist signups in 24h after post (check Loops)
- New paying customers (when we have payments)

---

## 📱 TikTok phase — for later (month 2-3)

When you've got:
- Working product
- Some paying customers
- 2-3 testimonials
- A 30-second demo video that "clicks"

Then:
- Find micro-influencers in the "AI tools" / "dev productivity" / "coding tips" niche on TikTok
- Look for accounts with 10k-100k followers (these are cheapest + highest engagement)
- Reach out: "Hey, I've got a tool your audience would love, would £100 for a 30s video work?"
- Track with unique discount codes (TIKTOK1, TIKTOK2 etc.) so you know which creator drove conversions
- Scale what works

Budget when ready: £200-500 to test 3-5 creators.

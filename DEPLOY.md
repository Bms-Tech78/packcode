# 🚀 Tonight's Deploy Checklist

> Goal: live URL collecting real waitlist emails in ~30 mins.

## 1. Buy the domain (~5 min)
- Go to **[porkbun.com](https://porkbun.com)** or **[cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/)**
- Search `packcode.dev` → buy it (~£12/yr)
- Fallbacks if taken: `packcode.app`, `ctxpack.dev`, `trypackcode.com`

## 2. Set up Loops (waitlist backend, ~5 min)
1. Sign up at **[loops.so](https://loops.so)** (free up to 1k contacts)
2. Settings → **Sign-up forms** → **Create form**
3. Name it "PackCode Waitlist"
4. Copy the **form ID** (looks like `clx1y2z3a4b5c6d7e8f9`)
5. In `packcode/landing/index.html`, find this line:
   ```js
   const LOOPS_FORM_ID = "";
   ```
   Paste your ID between the quotes. Save.

## 3. Deploy to Vercel (~10 min)
**Option A — Drag-and-drop (zero git, easiest):**
1. Sign up at **[vercel.com](https://vercel.com)** (free)
2. Dashboard → **Add New → Project → Deploy a static site**
3. Drag the entire `packcode/landing` folder onto the upload area
4. Done — you get a `*.vercel.app` URL immediately

**Option B — via GitHub (better long-term):**
1. Create a new public GitHub repo `packcode-landing`
2. Push the `packcode/landing` folder contents to the repo root
3. On Vercel: **Add New → Import Git Repo** → pick it → Deploy

## 4. Connect your domain (~5 min)
- In Vercel: **Project → Settings → Domains → Add** → type `packcode.dev`
- Vercel shows you 2 DNS records to add
- In Porkbun/Cloudflare DNS settings → add those records
- Wait 5-15 min → HTTPS auto-provisions → you're live ✅

## 5. Test it
- Open `https://packcode.dev` on phone + desktop
- Submit your own email through the form
- Check Loops dashboard → contact should appear
- 🎉 You now have a real waitlist

---

## Troubleshooting

- **Loops form not submitting?** Make sure you used the form ID (not the API key). Form ID is shown right under the form name in Loops.
- **Domain not connecting?** DNS takes up to an hour. Be patient. Use `dig packcode.dev` to check.
- **HTTPS warning?** Wait 10 more min for Vercel's auto SSL.

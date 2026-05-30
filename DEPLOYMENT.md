# 🌸 Deploying Ask Didi

The app is split into two halves that deploy separately:

| Part      | What it is                       | Where to deploy            |
|-----------|----------------------------------|----------------------------|
| Frontend  | React + Vite static build        | **Vercel** (free)          |
| Backend   | Node + Express API + secrets     | **Render** (free) or Railway |

Total time: ~15 minutes. No credit card needed for either tier.

---

## Step 1 · Deploy the backend (Render)

1. Go to https://render.com and sign in with GitHub.
2. Click **New → Web Service** → connect your `bahuli1203/AskDidi` repo.
3. Fill in:
   - **Name**: `askdidi-api`
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Add environment variables (Render → Environment tab):

   ```
   GROQ_API_KEY            = gsk_...
   GROQ_MODEL              = llama-3.3-70b-versatile
   GROQ_WHISPER_MODEL      = whisper-large-v3
   HF_API_KEY              = hf_...
   HF_EMOTION_MODEL        = j-hartmann/emotion-english-distilroberta-base
   ALLOWED_ORIGIN          = https://askdidi.vercel.app,https://*.vercel.app
   ```

   > Set `ALLOWED_ORIGIN` after Vercel deployment when you know the actual URL. For now use `*` and tighten it later.

5. Click **Create Web Service**. After 2–3 minutes you'll get a URL like `https://askdidi-api.onrender.com`.
6. Test it: open `https://askdidi-api.onrender.com/api/health` — should return `{ ok: true, integrations: { groq: true, huggingface: true } }`.

> ⚠ Render free tier sleeps after 15 min of inactivity. First request after wake-up takes ~30 seconds. For always-on, upgrade to Starter ($7/mo) or use Railway.

---

## Step 2 · Deploy the frontend (Vercel)

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project** → import `bahuli1203/AskDidi`.
3. Vercel auto-detects Vite. Confirm:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add environment variables (Vercel → Settings → Environment Variables):

   ```
   VITE_API_URL                = https://askdidi-api.onrender.com
   VITE_FIREBASE_API_KEY       = AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN   = ask-didi.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID    = ask-didi
   VITE_FIREBASE_APP_ID        = 1:...
   ```

5. Click **Deploy**. After ~1 minute you'll get `https://askdidi.vercel.app` (or whatever name Vercel assigns).
6. Tighten CORS: go back to Render → Environment, update `ALLOWED_ORIGIN` to your real Vercel URL, and **Manual Deploy → Clear build cache & deploy**.

---

## Step 3 · Update Firebase authorized domains

Firebase will reject sign-ins from unknown domains:

1. https://console.firebase.google.com/project/ask-didi/authentication/settings
2. Scroll to **Authorized domains** → **Add domain**
3. Add `askdidi.vercel.app` (and any custom domain later).

---

## Step 4 · (Optional) Custom domain

**Frontend** — Vercel → Settings → Domains → Add `yourdomain.com`. Vercel gives DNS records to paste at your registrar (Namecheap, GoDaddy, etc.).

**Backend** — Render → Settings → Custom Domain → e.g. `api.yourdomain.com`. Add a CNAME record per Render's instructions.

After custom domains exist:
- Update `VITE_API_URL` in Vercel to `https://api.yourdomain.com` and redeploy.
- Update `ALLOWED_ORIGIN` in Render to `https://yourdomain.com` and redeploy.
- Add `yourdomain.com` to Firebase authorized domains.

---

## Alternative · Railway (no sleep on free tier credits)

If you want the backend always-on, use Railway instead:

1. https://railway.app → **New Project → Deploy from GitHub**.
2. Select repo, set **Root Directory** = `server`.
3. Variables tab → paste the same `GROQ_API_KEY`, `HF_API_KEY`, etc.
4. Settings → **Generate Domain** → copy the URL into Vercel's `VITE_API_URL`.

Railway gives $5/mo of free credits — enough for low-traffic personal use.

---

## Common pitfalls

**Frontend says "couldn't reach my brain"** — backend is asleep (Render) or env var wrong. Open `<backend-url>/api/health` in a browser. If it loads but `groq: false`, your `GROQ_API_KEY` env var isn't saved.

**Google login error: `auth/unauthorized-domain`** — you forgot Step 3.

**CORS error in browser console** — Render still has `localhost:5173` only. Update `ALLOWED_ORIGIN` and redeploy.

**Voice/mic doesn't work in production** — production must be HTTPS. Vercel and Render are HTTPS by default, so this works automatically; only an issue if you're hosting elsewhere.

---

## Local production preview

Want to test the production build locally before deploying?

```bash
npm run build
npm run preview     # serves dist/ on http://localhost:4173
```

Backend doesn't need a build step — `npm start` is what Render runs.

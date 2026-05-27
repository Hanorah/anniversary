# Deploy to Vercel

Supabase credentials are loaded from environment variables only.

## 1. Add environment variables in Vercel

In **Project Settings → Environment Variables**, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Set them for **Production**, **Preview**, and **Development**.

> Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only. Never expose it in client code.

## 2. Push and deploy

Push to GitHub — Vercel will build automatically using these env vars.

## 3. Redeploy if you had a failed build

Go to **Deployments** → **Redeploy** on the latest commit after pushing.

## 4. URLs to use

- **Quiz (participants):** `https://your-app.vercel.app/`
- **Admin login:** `https://your-app.vercel.app/admin/login`
- **Admin dashboard:** `https://your-app.vercel.app/admin/dashboard`

Do not use the deployment ID URL from a failed build — use your main project domain.

## 5. If you still see 404

- Confirm the latest deployment status is **Ready** (not **Error**).
- Open the **Build Logs** — the build must finish without errors.
- Ensure **Framework Preset** is **Next.js** and **Root Directory** is empty (project root).

# TALVIORA TECH: Setup & Deployment Guide

**Document Version:** 1.0.0  
**Project:** TALVIORA TECH — AI Career Intelligence Platform  
**Target Environments:** Local Development • Vercel • Node.js Production Server  

---

## 1. Prerequisites

Before setting up TALVIORA TECH, ensure you have:
* **Node.js**: v18.18.0 or newer (v20+ recommended). Check via `node -v`.
* **npm**: v9.0.0 or newer. Check via `npm -v`.
* **Supabase Account**: Free or Pro tier at [supabase.com](https://supabase.com).
* **Google Gemini API Key**: Free tier from [Google AI Studio](https://aistudio.google.com).

---

## 2. Local Development Setup

### Step 1: Clone & Install Dependencies
```bash
git clone <your-repository-url> talviora-tech
cd talviora-tech
npm install
```

### Step 2: Configure Environment Variables
Copy the template file to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` in your editor and configure:
```ini
# Supabase Configuration (Note: use .supabase.co, NOT .supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key

# Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash

# Application Host URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> [!IMPORTANT]
> Never commit `.env` or `.env.local` to Git. The project `.gitignore` already excludes these files.

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. All 39 routes and dashboard panels are fully interactive.

---

## 3. Supabase Database Provisioning

To enable cloud persistence for profiles, assessments, interview screenings, and tasks:

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project (e.g. `vxqpsuzmdjaqvvnqtfcv`).
3. In the left sidebar, click **SQL Editor** -> **New Query**.
4. Open [`supabase/schema.sql`](file:///c:/Users/Asus/OneDrive/Desktop/AI%20CAREER%20INTELLIGENCE%20PLATFORM/supabase/schema.sql) in this repository and copy its entire content.
5. Paste into the SQL Editor and click **Run**.
6. Verify in the **Table Editor** that the following tables exist with RLS enabled:
   * `public.profiles`
   * `public.assessments`
   * `public.interview_sessions`
   * `public.tasks`
   * `public.bookmarks`
7. Under **Project Settings > API**, copy the **Project URL** and **anon public Key** into `.env.local`.

---

## 4. Production Deployment

### Option A: Deployment to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import your `talviora-tech` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Expand **Environment Variables** and add:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `GEMINI_API_KEY`
   * `NEXT_PUBLIC_APP_URL` (set to your production domain, e.g. `https://talviora.tech`)
6. Click **Deploy**. Vercel will build all static pages and dynamic API routes automatically.

### Option B: Self-Hosted Node.js / VPS Server
1. On your production server, build the production bundle:
```bash
npm run build
```
2. Start the production server with PM2 or systemd:
```bash
npm run start -p 3000
```
3. Configure an Nginx or Caddy reverse proxy with SSL certificates pointing to `http://localhost:3000`.

---

## 5. Troubleshooting & FAQ

### Issue: `DNS Lookup failed: ENOTFOUND ... .supabase.com`
* **Cause**: Supabase project host URLs use `.supabase.co` as the top-level domain, not `.supabase.com`.
* **Fix**: Ensure your `NEXT_PUBLIC_SUPABASE_URL` in `.env.local` ends with `.supabase.co`.

### Issue: PostgREST error `PGRST205: Could not find table in schema cache`
* **Cause**: The database tables have not been created yet in the Supabase project.
* **Fix**: Execute [`supabase/schema.sql`](file:///c:/Users/Asus/OneDrive/Desktop/AI%20CAREER%20INTELLIGENCE%20PLATFORM/supabase/schema.sql) in the Supabase SQL Editor. If you just created the tables, reload the schema cache by running:
```sql
NOTIFY pgrst, 'reload schema';
```

### Issue: `Gemini API key not valid`
* **Cause**: Placeholder or expired Gemini API key in `.env.local`.
* **Behavior**: AI assessment, mentor, and interview evaluation return a clear unavailable/error response. No substitute score or deterministic AI result is fabricated.
* **Fix**: Generate a key from [Google AI Studio](https://aistudio.google.com), update `GEMINI_API_KEY` (and optional `GEMINI_MODEL`) in `.env.local`, then restart the app.

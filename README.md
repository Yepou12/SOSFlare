# SOS Flare

Official site for SOS Flare, an iPhone puzzle game. One landing page, a privacy policy, support, terms, and `app-ads.txt`.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase Postgres for the launch waitlist and support messages
- No auth, no CMS, no analytics, no cookies, no tracking scripts

## Supabase project

A project named **SOS Flare** is already created and the migration is already applied.

- Project ref: `orntmthpnonedsjvbhtm`
- Region: `us-east-1`
- API URL: `https://orntmthpnonedsjvbhtm.supabase.co`

Tables: `waitlist` and `support_messages`. Row level security is on. There are no public policies. The site writes from the server with the service role key.

The free plan allows two projects. This organization was at that limit before this project was created. Do not put these tables in another app's database.

### If you need to create the project again

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) and create a project. A new free project costs $0 per month on the free plan, if you still have a free slot.
2. In the SQL editor, run `supabase/migrations/20261011132600_waitlist_and_support.sql`.
3. Confirm both tables have RLS enabled and no policies.

Or, with the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref orntmthpnonedsjvbhtm
npx supabase db push
```

`db push` on the existing project will try to run the migration again. Skip it there. The tables already exist. Use `db push` only on a fresh project, or paste the SQL once.

## Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `SUPABASE_URL` is already the SOS Flare project URL.
- `SUPABASE_SERVICE_ROLE_KEY` comes from the Supabase dashboard: Project Settings → API Keys → `service_role` (secret). Copy the legacy service role JWT, or a secret key (`sb_secret_...`).

Do not prefix either variable with `NEXT_PUBLIC_`. The service role key bypasses row level security. It must stay on the server.

```bash
npm run dev
```

## Deploy on Vercel

1. Import this repository in Vercel. Framework preset: Next.js.
2. Add the same two environment variables for Production (and Preview, if those forms should work):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy.
4. In the Vercel project, open Settings → Domains and add your domain. Point DNS at Vercel as the dashboard instructs.
5. After the domain is connected, set `SITE_URL` in `src/config/site.ts` to that `https://` address and deploy again so the sitemap, robots file, and Open Graph URL match the live domain.

## Launch day

Edit only `src/config/site.ts`:

- `SITE_URL` — the live domain, including `https://`
- `APP_STORE_URL` — the App Store link. When this is set, the landing page replaces the waitlist with Apple's Download on the App Store badge.
- `APP_STORE_ID` — the numeric App Store id. When this is set, the Smart App Banner (`apple-itunes-app`) meta tag is added.
- `CONTACT_EMAIL` — change this if you move off the current address
- `POLICY_LAST_UPDATED` — change this if you edit the privacy policy. Update the policy before any version that shows ads.

When you turn on ads, replace the comment in `public/app-ads.txt` with the ad network lines, then deploy again.

## Pages

- `/` landing page
- `/privacy` privacy policy
- `/support` FAQ and contact form
- `/terms` terms of use
- `/app-ads.txt` plain text
- `/sitemap.xml` and `/robots.txt`

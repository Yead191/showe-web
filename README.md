# SHOWE — Web

> Turn every performance into an interactive experience.

**SHOWE** transforms traditional printed event programmes into dynamic, interactive experiences that audiences access instantly through a simple **QR scan**. Attendees discover events, explore rich digital programmes, meet the artists behind the performance, and engage with the story before, during, and after the show. Organisers publish events, build immersive programmes, and grow their revenue.

This repository contains the **public marketing + audience web app** (Next.js App Router).

---

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routing & pages](#routing--pages)
- [Data fetching (`nextFetch`)](#data-fetching-nextfetch)
- [Styling & theming](#styling--theming)
- [SEO](#seo)
- [Keyword strategy per page](#keyword-strategy-per-page)
- [Deployment](#deployment)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript 5 |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + `tw-animate-css` |
| Components | [shadcn](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com/) primitives |
| Icons | `lucide-react`, `react-icons` |
| Forms & validation | `zod` |
| Notifications | `sonner` |
| Dates | `date-fns` |
| Carousels / media | `swiper`, `react-pageflip`, `react-pdf` / `pdfjs-dist` |
| Auth token storage | `js-cookie` (client) + HTTP-only access token (server) |
| Maps | Google Maps JS API (Places Autocomplete, UK-biased) |

> ⚠️ **This is Next.js 16.** APIs, conventions, and file structure differ from older versions. When in doubt, read the bundled docs in `node_modules/next/dist/docs/` before writing code.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file (see below)
cp .env.local.example .env.local   # or create .env.local manually

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Create a `.env.local` in the project root:

```env
# Backend API (server-side only)
BASE_URL=http://10.10.26.164:5002/api/v1

# Image host (used by getImageUrl + next/image)
IMAGE_BASE_URL=http://10.10.26.164:5002/files
NEXT_PUBLIC_IMAGE_BASE_URL=http://10.10.26.164:5002/files

# Realtime
NEXT_PUBLIC_SOCKET_URL=http://10.10.26.164:5002
SOCKET_URL=http://10.10.26.164:5002

# Google Maps (Places Autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Public site origin — used for SEO canonical URLs, Open Graph, sitemap & robots.
# Set to your production domain before deploying.
NEXT_PUBLIC_SITE_URL=https://showe.app
```

| Variable | Scope | Purpose |
| --- | --- | --- |
| `BASE_URL` | server | Base URL for all API calls made through `nextFetch`. |
| `IMAGE_BASE_URL` / `NEXT_PUBLIC_IMAGE_BASE_URL` | server / client | Prefix for API-served media (`getImageUrl`). |
| `NEXT_PUBLIC_SITE_URL` | client | Canonical origin for SEO tags, `sitemap.xml`, `robots.txt`. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | client | Places Autocomplete in the event search box. |
| `*_SOCKET_URL` | both | Realtime socket endpoint. |

> The API host is a private IP, so `next.config.ts` sets `images.dangerouslyAllowLocalIP: true` and whitelists the host under `images.remotePatterns`.

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

---

## Project structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — global metadata, fonts, Toaster
│   ├── page.tsx                # "/" main landing
│   ├── sitemap.ts              # Dynamic sitemap.xml
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx           # 404 page
│   ├── (landing)/              # Marketing route group
│   │   ├── for-users/
│   │   ├── become-creator/
│   │   └── organisation-register/
│   ├── (website)/              # Main app route group (navbar + footer layout)
│   │   ├── home/
│   │   ├── about/
│   │   ├── support/
│   │   ├── events/  events/[id]/
│   │   ├── programmes/  programmes/[id]/
│   │   ├── artists/[id]/
│   │   └── dashboard/          # Private: profile, tickets, favourites (noindex)
│   └── reader/  reader/[id]/   # Interactive programme reader
├── components/
│   ├── shared/                 # Navbar, footer, search, spinner, splash…
│   └── ui/                     # shadcn UI primitives
├── features/
│   ├── auth/                   # Login, register, OTP, org onboarding wizard
│   └── web-pages/              # Page-level feature modules (one per route)
├── helpers/
│   └── next-fetch/             # Server fetch wrapper, auth token, revalidation
├── lib/                        # getImageUrl, seo, utils, google maps, onboarding
├── constants/  hooks/  types/
```

### Feature-first organisation

Route files under `app/` stay thin: they resolve params/`searchParams`, fetch data on the server, and delegate rendering to a matching module in `src/features/web-pages/<feature>`. This keeps routing, data fetching, and presentation cleanly separated.

---

## Routing & pages

| Route | Type | Description | Indexed |
| --- | --- | --- | --- |
| `/` | Static | Main landing (video hero, product story) | ✅ |
| `/home` | Dynamic | Audience home — featured events & artists | ✅ |
| `/about` | Static | About SHOWE | ✅ |
| `/support` | Static | Help centre & contact | ✅ |
| `/events` | Dynamic | Event search (location, date, category, pagination) | ✅ |
| `/events/[id]` | Dynamic | Event detail — gallery, performances, programme, artist | ✅ |
| `/programmes` | Dynamic | Interactive programmes carousel (category tabs) | ✅ |
| `/programmes/[id]` | Dynamic | Programme detail (PDF/flip reader) | ✅ |
| `/artists/[id]` | Dynamic | Artist profile & upcoming events | ✅ |
| `/reader/[id]` | Dynamic | Immersive block-based programme reader | ✅ |
| `/for-users` | Static | Marketing — for audiences | ✅ |
| `/become-creator` | Static | Marketing — for creators/organisers | ✅ |
| `/organisation-register` | Static | Organisation onboarding wizard | ✅ |
| `/dashboard/*` | Dynamic | Private user area (profile, tickets, favourites) | 🚫 noindex |

---

## Data fetching (`nextFetch`)

All API access goes through the server-side wrapper `src/helpers/next-fetch/NextFetch.ts` (a `"use server"` action):

```ts
const { data, pagination } = await nextFetch<Event[]>(`/event/search?${params}`, {
  method: "GET",
  cache: "force-cache",
  tags: [`event-${id}`],
})
```

- Automatically attaches the `Authorization` bearer token (`getAccessToken`).
- Normalises responses to `{ success, message, data, error, pagination }`.
- Supports Next.js cache tags for on-demand revalidation (`revalidateTags`).
- `GET` requests honour `cache`; mutations are always `no-store`.

Pages fetch on the server, then stream results into the client. Where a page and its `generateMetadata` need the same data (e.g. `events/[id]`), the request is wrapped in React's [`cache()`](https://react.dev/reference/react/cache) so it only runs once.

---

## Styling & theming

- **Tailwind CSS v4** with a CSS-first theme defined in `src/app/globals.css` via `@theme`.
- Brand tokens (teal `primary`, gold `accent`, warm `surface`/`ink`/`line` scales, semantic colours) are registered as `--color-*` variables so utilities like `text-ink`, `bg-surface-raised`, `border-line`, `shadow-soft` are generated.
- shadcn design tokens (oklch) power the UI primitives; brand `primary`/`accent` are re-pointed to teal/gold **only inside `.programme-reader`** so shadcn components elsewhere are unaffected.
- Fonts: **Montserrat** (body) and **MuseoModerno** (display), loaded via `next/font`.

---

## SEO

SEO is centralised in **`src/lib/seo.ts`**:

- `siteConfig` — brand name, canonical URL, description, locale, default OG image, and global keywords.
- `buildMetadata()` — returns a fully-formed Next.js `Metadata` object: `title`, `description`, merged `keywords`, canonical `alternates`, **Open Graph** + **Twitter** cards, and `robots` directives (with a `noIndex` switch for private pages).
- `toMetaDescription()` — strips HTML and clamps text to a meta-safe length (used for event/artist descriptions).

Implementation details:

- **Root layout** (`app/layout.tsx`) sets `metadataBase`, a title template (`%s | SHOWE`), default OG/Twitter tags, `robots`, icons, `themeColor`, and the base keyword set.
- **Static pages** export `const metadata = buildMetadata({ … })`.
- **Dynamic pages** (`events/[id]`, `artists/[id]`, `programmes/[id]`, `reader/[id]`, and the `programmes` list) export `generateMetadata()` that builds titles, descriptions, keywords, and OG images from live data.
- **`app/sitemap.ts`** generates `sitemap.xml` from static routes + live events, artists, and programmes (revalidated hourly, resilient to API failures).
- **`app/robots.ts`** allows crawling of public routes and disallows `/dashboard` and API paths, and references the sitemap.
- **Private pages** (`/dashboard/*`) are `noIndex` and also disallowed in `robots.txt`.

> **Before deploying:** set `NEXT_PUBLIC_SITE_URL` to your real domain so canonical + OG URLs and the sitemap resolve correctly. Add a `1200×630` `opengraph-image` (or replace `/logo.png`) for richer social sharing.

---

## Keyword strategy per page

Every page merges the **brand keyword set** (`SHOWE`, interactive event programmes, digital event programme, QR event programme, digital playbill, interactive playbill, event app, live event experience, theatre programme app, event engagement platform) with page-specific terms:

| Page | Primary target keywords |
| --- | --- |
| `/` (landing) | interactive event programme, QR event programme, digital playbill, live event experience |
| `/home` | discover events, events near me, book event tickets, live performances, theatre shows, concerts near me, upcoming events, what's on |
| `/events` | search events, events near me, find events by location, event calendar, upcoming shows, theatre events, concert listings, filter events by date |
| `/events/[id]` | *event title*, *category*, event tickets, show times, event programme, events in *location*, *event tags* |
| `/programmes` | digital programmes, interactive programmes, event programmes, theatre programmes, browse programmes, digital playbill (+ *category*) |
| `/programmes/[id]` | digital programme, interactive programme reader, event programme, playbill, show notes, *programme title* |
| `/artists/[id]` | *artist name*, *category*, artist profile, performer, upcoming performances, *name* events, *name* tour, *genres* |
| `/reader/[id]` | programme reader, digital programme, interactive playbill, *programme title* |
| `/about` | about SHOWE, interactive event technology, digital programme platform, event engagement, QR programme technology |
| `/support` | SHOWE support, help centre, contact SHOWE, FAQ, customer service, event app help, ticket support |
| `/for-users` | SHOWE for attendees, event app for fans, interactive programmes for audiences, discover shows, scan event QR code |
| `/become-creator` | create event programmes, event organiser tools, digital programme builder, sell programmes, monetise events, event creator platform |
| `/organisation-register` | register organisation, event organiser signup, venue registration, organiser onboarding, list your events |

Dynamic keywords in *italics* are injected at request time from live data (event titles, categories, tags, artist names/genres, etc.).

---

## Deployment

1. Set all [environment variables](#environment-variables) — especially `NEXT_PUBLIC_SITE_URL` and `BASE_URL`.
2. Build and start:

   ```bash
   npm run build
   npm run start
   ```

3. Verify SEO output in production:
   - `https://<domain>/robots.txt`
   - `https://<domain>/sitemap.xml`
   - View page source and confirm `<title>`, `<meta name="description">`, canonical, and OG tags.
4. Submit the sitemap in Google Search Console.

Deploying to [Vercel](https://vercel.com/new) works out of the box for Next.js; ensure the private API host is reachable from the deployment environment (or move it behind a public gateway).

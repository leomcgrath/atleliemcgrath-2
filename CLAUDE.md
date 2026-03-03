# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 website for Atle Lie McGrath, an Alpine Racer. The site displays race schedules, results, sponsor information, and Instagram content.

## Development Commands

```bash
npm run dev       # Start development server on http://localhost:3000
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Environment Variables

Required in `.env`:

```
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_KEY=<your_supabase_anon_key>
INSTAGRAM_ACCESS_TOKEN=<your_instagram_graph_api_token>
```

The Instagram access token requires a Business/Creator account and Facebook App with Instagram Graph API permissions.

## Architecture

### App Router Structure
- **Server components** by default (app/page.tsx, app/calendar/page.tsx, app/about/page.tsx, app/partners/page.tsx)
- **Client components** marked with `"use client"` (RaceCalendar.tsx uses useEffect for scroll behavior)
- **API routes** in app/api/ (Instagram integration at app/api/instagram/route.ts)

### Data Layer
- `app/lib/supabase.ts` - Supabase client initialization
- `app/lib/race-schedule.ts` - Race schedule data fetching and formatting
  - `getRaces()` - Fetches all races with `isNextRace` flag set based on current date
  - `getNextRace()` - Returns only the next upcoming race
  - `formatRaceDate()` - Formats YYYY-MM-DD dates to display format (e.g., "26 OCT")

### Key Components
- `Header.tsx` - Navigation with next race display (fetches via `getNextRace()`)
- `RaceCalendar.tsx` - Horizontal scrollable race cards, auto-scrolls to next race
- `Partners.tsx` / `PartnersPage.tsx` - Sponsor/partner displays
- `Instagram.tsx` - Instagram feed (client-side fetch from API route)
- `About.tsx` / `Partners.tsx` - Content sections

### Supabase Schema
The app expects a `race_schedule` table with columns:
- `id`, `round`, `country`, `city`, `race_date` (YYYY-MM-DD format)
- `country_code`, `discipline`, `position` (e.g., "P1", "P2", "P3")

### Image Configuration
- Next.js config includes remote domains: `flagcdn.com` for country flags and various Instagram CDN domains
- Static assets in `public/` (atle-logo-hvit.png, atle-cowboy.png, etc.)
- Local images use `next/image` with priority/quality settings for performance

### Styling
- Tailwind CSS v4 with PostCSS
- Custom color palette: yellow (`#FFD700`), dark blue (`#0a0e27`), dark grey (`#2a2a2a`)
- Geist fonts via `next/font/google`
- Medal colors for race positions: Gold (`P1`), Silver (`P2`), Bronze (`P3`)

### Instagram Integration
- API route fetches from Instagram Graph API: `/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=9`
- Cached with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- Fallback error handling if token is invalid or missing
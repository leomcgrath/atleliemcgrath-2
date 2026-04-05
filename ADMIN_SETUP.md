# Admin Dashboard Setup Guide

This guide explains how to set up the admin dashboard for managing race calendar and website content.

## Database Schema Setup

Run these SQL commands in your Supabase SQL Editor to create the required tables and enable auth:

### 1. Enable Supabase Auth
Auth is already enabled by default in Supabase. You just need to create your admin user in the Supabase dashboard under Authentication > Users.

### 2. Create the website_content table
```sql
CREATE TABLE IF NOT EXISTS website_content (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  section TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_content_key ON website_content(key);
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);

-- Enable RLS (optional, for production)
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Allow service role (server) to read/write
CREATE POLICY "Service role can manage content"
  ON website_content
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 3. Ensure race_schedule table exists
```sql
CREATE TABLE IF NOT EXISTS race_schedule (
  id BIGSERIAL PRIMARY KEY,
  round INTEGER NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  race_date DATE NOT NULL,
  country_code TEXT NOT NULL,
  discipline TEXT,
  position TEXT,

  -- Add indexes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_race_schedule_date ON race_schedule(race_date);
```

## Environment Variables

Add these to your `.env` file (already added to your project):

```env
# Supabase Server-side (for API routes)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key

# Supabase Client-side (for Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin user email (must match Supabase Auth user)
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

## Setup Steps

### 1. Create Admin User in Supabase
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email (e.g., `admin@example.com`) and password
4. Click "Create user"
5. Copy the email to your `.env` file as `NEXT_PUBLIC_ADMIN_EMAIL`

### 2. Test Login
1. Go to `http://localhost:3000/admin/login`
2. Enter your admin email and password
3. You should be redirected to the admin dashboard

### 3. Add Some Initial Content
1. Go to the "Website Content" tab
2. Add content items with keys like:
   - `home_hero_title` -> "ATLE"
   - `home_hero_subtitle` -> "LIE MCGRATH"
   - `about_section_title` -> "About Atle"

## Using Content in Your Pages

Use the `getContent` and `getContentWithFallback` functions from `app/lib/content.ts`:

```typescript
import { getContentWithFallback, getContentMultiple } from "../lib/content";

export default async function Page() {
  const heroTitle = await getContentWithFallback("home_hero_title", "ATLE");
  const heroSubtitle = await getContentWithFallback("home_hero_subtitle", "LIE MCGRATH");

  // Or fetch multiple at once
  const allContent = await getContentMultiple([
    "home_hero_title",
    "home_hero_subtitle",
    "about_section_text",
  ]);

  return (
    <div>
      <h1>{allContent["home_hero_title"]}</h1>
      <h2>{allContent["home_hero_subtitle"]}</h2>
    </div>
  );
}
```

## Recommended Content Keys

Here are suggested keys for different sections:

### Home Page
- `home_hero_title`
- `home_hero_subtitle`
- `home_hero_tagline`
- `home_cta_text`

### About Page
- `about_page_title`
- `about_section_title`
- `about_intro_text`
- `about_stats_nationality`
- `about_stats_team`
- `about_bio_section`

### Partners Page
- `partners_page_title`
- `partners_intro_text`

## Security Notes

- The admin dashboard checks the user email against `NEXT_PUBLIC_ADMIN_EMAIL`
- In production, consider moving this check to a server-side API route
- Enable Row Level Security (RLS) on your tables for production
- Use environment variables that are not committed to version control

## API Routes

- `GET /api/races` - Get all races
- `POST /api/races` - Create a race
- `PUT /api/races` - Update a race
- `DELETE /api/races?id=X` - Delete a race

- `GET /api/content` - Get all content
- `POST /api/content` - Create or update content
- `DELETE /api/content?key=X` - Delete content
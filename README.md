# Smart Bookmark App

A real-time, private bookmark manager built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.

## Features

- **Google OAuth**: Secure login using your Google account.
- **Real-time Sync**: Add/delete bookmarks in one tab and see them update instantly in others.
- **Privacy**: Each user's bookmarks are private and protected using Supabase Row Level Security (RLS).
- **Modern UI**: A premium, responsive design with dark mode and smooth animations.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## Setup Instructions

### 1. Supabase Project Setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **Authentication > Providers** and enable **Google**. 
   - You will need to configure the Google Cloud Console with the redirect URI provided by Supabase.
3. In the **SQL Editor**, run the script provided in `supabase_schema.sql` (found in the artifacts) to create the `bookmarks` table and set up RLS.
4. Go to **Project Settings > API** (the gear icon on the left sidebar).
   - **Project URL**: Copy the value under "Project URL".
   - **anon public**: Copy the value under "API Key (anon public)".
   - *Note: Do NOT use the `service_role` key here.*

### 2. Local Environment Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Problems Encountered & Solutions

The integration with Supabase was generally straightforward, but a few modern framework quirks required attention:

### 1. Next.js 16 Proxy Migration
- **Problem**: Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`, causing build warnings.
- **Solution**: Migrated the middleware logic to `src/proxy.ts` and updated the export to follow the new convention.

### 2. Hydration Mismatch
- **Problem**: Browser extensions adding attributes to the `<body>` caused React hydration errors.
- **Solution**: Added `suppressHydrationWarning` to the root layout to ignore non-critical DOM mismatches caused by external tools.

### 3. Real-time Delete Sync
- **Problem**: Real-time deletion events weren't triggering UI updates when using user-level filters.
- **Solution**: Enabled `REPLICA IDENTITY FULL` on the `bookmarks` table to ensures that delete events broadcast the full record needed for client-side filtering.

### 4. Boilerplate Setup
- **Problem**: Next.js 15+ defaults (v4 Tailwind, new Cookie API) differ from older templates.
- **Solution**: Manually updated the Supabase middleware and CSS utility imports to align with the latest stable versions of these dependencies.

---

Built with ❤️ by Antigravity. Always a smooth experience building with Supabase.

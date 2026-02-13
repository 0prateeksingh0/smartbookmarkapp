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

### 1. Next.js Directory Naming
- **Problem**: Lowercase directory names are required by npm for project initialization via `create-next-app`.
- **Solution**: Initialized the project in a temporary directory and moved the files to the workspace root.

### 2. Next.js 15+ Cookie API Changes
- **Problem**: The `cookies().set()` API in Next.js 15+ changed its signature, causing lint errors in the Supabase middleware template.
- **Solution**: Updated the middleware to use the object syntax `{ name, value, ...options }` for the `cookies.set` method.

### 3. Tailwind CSS v4 Migration
- **Problem**: Next.js 15 uses Tailwind v4 by default, which has a different configuration structure than v3.
- **Solution**: Adapted the design to use v4-compatible imports and kept the configuration minimal as v4 handles most things automatically via CSS imports.

---

Built with ❤️ by Antigravity.

# Supabase setup instructions

This directory contains SQL scripts for setting up your Supabase database.

## Prerequisites

1. Create a free Supabase account at https://supabase.com
2. Create a new project (note down your project URL and anon key)

## Setup Steps

### 1. Create Database Tables

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor (left sidebar)
3. Copy the contents of `schema.sql` and run it in the SQL Editor
4. This creates the `threads` and `messages` tables with proper relationships and indexes

### 2. Add Test Data

1. In the SQL Editor, copy the contents of `seed.sql` and run it
2. This adds 10 sample chat threads with multiple messages each
3. You can verify the data by going to Table Editor → threads

### 3. Configure Row Level Security (RLS)

For this tutorial, we'll **disable** RLS to keep things simple:

1. Go to Authentication → Policies
2. For both `threads` and `messages` tables, ensure RLS is **disabled**
3. (In production apps, you would enable RLS and add proper security policies)

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env` in the frontend directory:

   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Get your Supabase credentials:

   - Go to Project Settings → Data API
   - Copy the "Project URL" (for step 3)
   - Go to Project Settings → API Keys
   - Copy the "anon public" key (for step 3)

3. Update `frontend/.env`:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Restart your development server to load the new environment variables

## Verify Setup

Run these queries in the SQL Editor to verify your setup:

```sql
-- Check threads were created
SELECT COUNT(*) FROM threads;
-- Should return 10

-- Check messages were created
SELECT COUNT(*) FROM messages;
-- Should return 30+

-- View a thread with its messages
SELECT
  t.title,
  m.type,
  m.content,
  m.created_at
FROM threads t
JOIN messages m ON m.thread_id = t.id
WHERE t.id = '11111111-1111-1111-1111-111111111111'
ORDER BY m.created_at;
```

## Schema overview

### threads table

- `id` (uuid): Primary key, auto-generated
- `title` (text): Thread title (required)
- `created_at` (timestamp): Creation timestamp

### messages table

- `id` (uuid): Primary key, auto-generated
- `thread_id` (uuid): Foreign key to threads table
- `type` (text): Either 'user' or 'bot' (constrained)
- `content` (text): Message content (required)
- `created_at` (timestamp): Creation timestamp

## Clean up (optional)

To start fresh, delete all data:

```sql
-- Delete all messages (will cascade from threads)
DELETE FROM threads;
```

Then re-run the seed.sql script to restore test data. Or create your own.

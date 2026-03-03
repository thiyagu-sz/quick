-- =====================================================
-- REPAIR FEEDBACK TABLE AND RLS POLICIES
-- =====================================================
-- This script:
-- 1. Renames feedback_type to category
-- 2. Adds missing columns (rating, title, features, etc.)
-- 3. Fixes RLS policies
-- =====================================================

-- 1. Update Table Structure
DO $$ 
BEGIN
    -- Rename feedback_type to category if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'feedback_type') THEN
        ALTER TABLE feedback RENAME COLUMN feedback_type TO category;
    END IF;

    -- Add missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'rating') THEN
        ALTER TABLE feedback ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'title') THEN
        ALTER TABLE feedback ADD COLUMN title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'features') THEN
        ALTER TABLE feedback ADD COLUMN features TEXT[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'improvements') THEN
        ALTER TABLE feedback ADD COLUMN improvements TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feedback' AND column_name = 'would_recommend') THEN
        ALTER TABLE feedback ADD COLUMN would_recommend BOOLEAN DEFAULT true;
    END IF;
END $$;

-- 2. Ensure RLS is enabled
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 3. Drop ALL existing policies to clear conflicts
DO $$ 
DECLARE 
    pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'feedback') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON feedback', pol.policyname);
    END LOOP;
END $$;

-- 4. Create robust INSERT policy
CREATE POLICY "feedback_insert_policy" ON feedback
FOR INSERT 
WITH CHECK (true);

-- 5. Create SELECT policy
CREATE POLICY "feedback_select_policy" ON feedback
FOR SELECT
USING (
  auth.uid() = user_id OR 
  (auth.uid() IS NULL AND user_id IS NULL) OR
  (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
);

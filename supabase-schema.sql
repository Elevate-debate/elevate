-- ====================================================================
-- ELEVATE THE CIRCUIT (ETC) - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ====================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- It creates all required tables, Row-Level Security (RLS) policies,
-- triggers for automatic user profiles on SSO login, and seed data.
-- ====================================================================

-- 1. Create Profiles Table (Synced automatically with Supabase Auth / SSO)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'chapter_lead', 'educator', 'debater', 'member')),
  school_name TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Chapters Table
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_name TEXT NOT NULL,
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state VARCHAR(2) NOT NULL,
  region TEXT DEFAULT 'National',
  school_type TEXT DEFAULT 'High School' CHECK (school_type IN ('High School', 'Middle School', 'Combined')),
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Launching Soon', 'In Formation')),
  year_founded INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  students_count INT DEFAULT 0,
  schools_worked_with INT DEFAULT 1,
  events_offered TEXT[] DEFAULT ARRAY['Public Forum', 'Lincoln Douglas', 'Original Oratory', 'Congressional Debate'],
  advisor_name TEXT,
  student_lead_name TEXT,
  contact_email TEXT,
  instagram_handle TEXT,
  website_url TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Chapter Starter Applications Table
CREATE TABLE IF NOT EXISTS public.chapter_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_role TEXT NOT NULL CHECK (applicant_role IN ('student', 'educator', 'parent', 'alumni')),
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state VARCHAR(2) NOT NULL,
  estimated_students INT DEFAULT 10,
  target_formats TEXT[] DEFAULT ARRAY['Public Forum'],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'declined')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Resources Table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('starter-kits', 'curriculum', 'middle-school', 'formats', 'topics', 'tournaments')),
  format_badge TEXT NOT NULL,
  description TEXT NOT NULL,
  download_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES:
-- Anyone can view basic public profile info
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- CHAPTERS POLICIES:
-- Everyone can read chapters (public directory)
CREATE POLICY "Chapters are viewable by everyone" 
  ON public.chapters FOR SELECT 
  USING (true);

-- Authenticated users (logged in with Google/SSO) can submit new chapters
CREATE POLICY "Authenticated users can insert chapters" 
  ON public.chapters FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Chapter creator or admin can update chapter details
CREATE POLICY "Creators and admins can update their chapters" 
  ON public.chapters FOR UPDATE 
  USING (
    auth.uid() = created_by 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- APPLICATIONS POLICIES:
-- Anyone can submit a chapter founding application
CREATE POLICY "Anyone can submit an application" 
  ON public.chapter_applications FOR INSERT 
  WITH CHECK (true);

-- Applicants can view their own application, and admins can view all
CREATE POLICY "Users and admins view applications" 
  ON public.chapter_applications FOR SELECT 
  USING (
    auth.uid() = created_by 
    OR applicant_email = auth.jwt() ->> 'email'
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RESOURCES POLICIES:
-- Everyone can view resources
CREATE POLICY "Resources are viewable by everyone" 
  ON public.resources FOR SELECT 
  USING (true);

-- Admins can manage resources
CREATE POLICY "Admins can manage resources" 
  ON public.resources FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ====================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER (ON GOOGLE / SSO SIGNUP)
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    CASE 
      WHEN NEW.email = 'elevatethecircuitusa@gmail.com' THEN 'admin'
      ELSE 'member'
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================
-- Delete any obsolete mock chapters if they exist
DELETE FROM public.chapters 
WHERE chapter_name IN (
  'Triangle Forensics Collective',
  'Piedmont Middle Speech League',
  'Metro Atlanta Forensics Initiative',
  'Chesapeake Debate Guild'
);

INSERT INTO public.chapters (
  chapter_name, school_name, city, state, region, school_type, 
  status, year_founded, students_count, schools_worked_with, 
  events_offered, advisor_name, student_lead_name, contact_email, 
  instagram_handle, notes
) VALUES
(
  'Elevate Debate NC',
  'Charlotte Partner Schools Consortium',
  'Charlotte',
  'NC',
  'Southeast',
  'High School',
  'Active',
  2025,
  130,
  5,
  ARRAY['Original Oratory', 'Impromptu', 'Congressional Debate', 'Public Forum', 'Lincoln Douglas'],
  'Regional Faculty Advisor',
  'Derin Gulkanat & Ishan Saha',
  'elevatedebateusa@gmail.com',
  '@elevatedebatenc',
  'Flagship founding chapter empowering 5 partner schools with weekly scrimmage rounds and coaching.'
)
ON CONFLICT DO NOTHING;

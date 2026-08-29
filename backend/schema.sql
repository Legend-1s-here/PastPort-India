-- ============================================================================
-- PASTPORT INDIA — SUPABASE POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- Aligned with End-to-End Workflow Architecture Diagram
-- ============================================================================

-- 1. MONUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.monuments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    alternate_names TEXT[],
    location VARCHAR(255) NOT NULL,
    period VARCHAR(255) NOT NULL,
    built_by VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    historical_summary TEXT NOT NULL,
    full_description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    model_url TEXT NOT NULL,
    cultural_significance TEXT[],
    is_unesco BOOLEAN DEFAULT false,
    is_flagship BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HOTSPOTS TABLE
CREATE TABLE IF NOT EXISTS public.hotspots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monument_id UUID REFERENCES public.monuments(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    position_z FLOAT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER FAVORITES TABLE (Data Persistence)
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    monument_id UUID REFERENCES public.monuments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, monument_id)
);

-- 4. USER QUIZ SCORES TABLE
CREATE TABLE IF NOT EXISTS public.user_quiz_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    quiz_id VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    max_score INT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. USER FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS public.user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    monument_id UUID REFERENCES public.monuments(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.monuments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Public read access for monuments and hotspots
CREATE POLICY "Public monuments are viewable by everyone" ON public.monuments
    FOR SELECT USING (true);

CREATE POLICY "Public hotspots are viewable by everyone" ON public.hotspots
    FOR SELECT USING (true);

-- User-authenticated persistence policies
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz scores" ON public.user_quiz_scores
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert feedback" ON public.user_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

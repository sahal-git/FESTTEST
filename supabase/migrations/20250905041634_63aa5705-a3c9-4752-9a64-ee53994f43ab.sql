-- Create enums for categories and program types
CREATE TYPE public.student_category AS ENUM ('junior', 'senior', 'super_senior');
CREATE TYPE public.program_category AS ENUM ('junior', 'senior', 'super_senior', 'all');
CREATE TYPE public.program_type AS ENUM ('stage', 'nonstage', 'sports');
CREATE TYPE public.result_position AS ENUM ('1st', '2nd', '3rd');
CREATE TYPE public.result_grade AS ENUM ('A', 'B', 'C');

-- Create teams table
CREATE TABLE public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_no TEXT UNIQUE NOT NULL,
    fest_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    category student_category NOT NULL,
    team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stage programs table
CREATE TABLE public.stage_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category program_category NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create nonstage programs table
CREATE TABLE public.nonstage_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category program_category NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sports programs table
CREATE TABLE public.sports_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category program_category NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create participations table
CREATE TABLE public.participations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    group_name TEXT,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    program_type program_type NOT NULL,
    program_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create results table
CREATE TABLE public.results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participation_id UUID REFERENCES public.participations(id) ON DELETE CASCADE,
    position result_position,
    grade result_grade,
    points_awarded INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create scoring rules table
CREATE TABLE public.scoring_rules (
    id SERIAL PRIMARY KEY,
    position result_position NOT NULL,
    default_points INTEGER NOT NULL
);

-- Insert default scoring rules
INSERT INTO public.scoring_rules (position, default_points) VALUES 
('1st', 10),
('2nd', 7),
('3rd', 5);

-- Enable Row Level Security on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stage_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nonstage_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scoring_rules ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies (for now - will need to implement auth later)
CREATE POLICY "Admin only access" ON public.teams FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.students FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.stage_programs FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.nonstage_programs FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.sports_programs FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.participations FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.results FOR ALL USING (true);
CREATE POLICY "Admin only access" ON public.scoring_rules FOR ALL USING (true);

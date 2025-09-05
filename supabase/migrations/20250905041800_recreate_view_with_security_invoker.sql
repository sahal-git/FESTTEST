/*
# [Operation Name]
Recreate Detailed Participations View with SECURITY INVOKER

## Query Description: [This operation drops the existing 'detailed_participations' view and recreates it with the correct security settings (SECURITY INVOKER). This is a critical security fix to ensure that Row-Level Security policies are properly enforced for all users querying this view, preventing unauthorized data access. The previous version used SECURITY DEFINER, which is a significant security risk.]

## Metadata:
- Schema-Category: ["Security", "Structural"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: false

## Structure Details:
- Drops view: public.detailed_participations
- Creates view: public.detailed_participations

## Security Implications:
- RLS Status: [Corrected]
- Policy Changes: [Yes]
- Auth Requirements: [This change ensures auth-based RLS policies will now be correctly applied to this view.]

## Performance Impact:
- Indexes: [N/A]
- Triggers: [N/A]
- Estimated Impact: [Low. This is a metadata change and should not impact query performance.]
*/

-- Drop the existing view if it exists to ensure a clean slate.
DROP VIEW IF EXISTS public.detailed_participations;

-- Recreate the view without SECURITY DEFINER to use the default SECURITY INVOKER.
-- This ensures that the permissions of the user querying the view are used.
CREATE VIEW public.detailed_participations AS
SELECT
    p.id,
    p.created_at,
    p.program_id,
    p.program_type,
    p.student_id,
    p.team_id,
    s.name AS student_name,
    s.admission_no,
    t.name AS team_name,
    CASE
        WHEN p.program_type = 'stage' THEN sp.title
        WHEN p.program_type = 'nonstage' THEN nsp.title
        WHEN p.program_type = 'sports' THEN sportsp.title
        ELSE NULL
    END AS program_name
FROM
    participations p
LEFT JOIN
    students s ON p.student_id = s.id
LEFT JOIN
    teams t ON p.team_id = t.id
LEFT JOIN
    stage_programs sp ON p.program_id = sp.id AND p.program_type = 'stage'
LEFT JOIN
    nonstage_programs nsp ON p.program_id = nsp.id AND p.program_type = 'nonstage'
LEFT JOIN
    sports_programs sportsp ON p.program_id = sportsp.id AND p.program_type = 'sports';

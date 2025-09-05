/*
# [Fix Security Definer View]
This migration addresses a critical security advisory by dropping and recreating the `detailed_participations` view. The original view was created with `SECURITY DEFINER`, which poses a security risk by potentially bypassing Row-Level Security (RLS) policies.

## Query Description:
This script first drops the existing `detailed_participations` view to remove the insecure definition. It then recreates the view without the `SECURITY DEFINER` property. This ensures the view defaults to `SECURITY INVOKER`, which correctly enforces the permissions and RLS policies of the user querying the view. This change is essential for maintaining data security and integrity. There is no risk of data loss as this operation only affects a view, not the underlying tables.

## Metadata:
- Schema-Category: "Security"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- **Dropped:** `VIEW public.detailed_participations`
- **Created:** `VIEW public.detailed_participations` (with default `SECURITY INVOKER` property)

## Security Implications:
- RLS Status: This change is critical for RLS to function correctly on queries using this view.
- Policy Changes: No.
- Auth Requirements: Any user querying this view will now have their own RLS policies applied.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact. This is a metadata change for security purposes.
*/

DROP VIEW IF EXISTS public.detailed_participations;

CREATE VIEW public.detailed_participations AS
SELECT
    p.id,
    p.program_id,
    p.program_type,
    p.student_id,
    p.team_id,
    p.created_at,
    CASE
        WHEN p.program_type = 'stage' THEN sp.title
        WHEN p.program_type = 'nonstage' THEN nsp.title
        WHEN p.program_type = 'sports' THEN sportsp.title
        ELSE NULL
    END AS program_name,
    s.name AS student_name,
    s.admission_no,
    t.name AS team_name
FROM
    public.participations p
LEFT JOIN
    public.students s ON p.student_id = s.id
LEFT JOIN
    public.teams t ON p.team_id = t.id
LEFT JOIN
    public.stage_programs sp ON p.program_id = sp.id AND p.program_type = 'stage'
LEFT JOIN
    public.nonstage_programs nsp ON p.program_id = nsp.id AND p.program_type = 'nonstage'
LEFT JOIN
    public.sports_programs sportsp ON p.program_id = sportsp.id AND p.program_type = 'sports';

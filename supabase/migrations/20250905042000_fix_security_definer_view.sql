/*
# [CRITICAL SECURITY FIX] Recreate View with SECURITY INVOKER
This migration script addresses a critical security vulnerability by dropping and recreating the `detailed_participations` view. The original view was created with `SECURITY DEFINER`, which bypasses Row-Level Security (RLS) policies. This script ensures the view is created with the default `SECURITY INVOKER` property, which correctly enforces the permissions of the user querying the view.

## Query Description:
- **DROP VIEW:** This command safely removes the existing `detailed_participations` view. It will not result in data loss as views do not store data themselves.
- **CREATE VIEW:** This command recreates the view with the same logic but without the dangerous `SECURITY DEFINER` option. This is the standard and secure way to create views in Supabase.

## Metadata:
- Schema-Category: ["Structural", "Safe"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- **Dropped:** `public.detailed_participations` (view)
- **Created:** `public.detailed_participations` (view)

## Security Implications:
- RLS Status: This change is ESSENTIAL for RLS to function correctly on this view.
- Policy Changes: No. This fixes the enforcement of existing and future policies.
- Auth Requirements: Any RLS policies you have on the underlying tables (`participations`, `students`, `teams`, etc.) will now be correctly applied.

## Performance Impact:
- Indexes: Not applicable.
- Triggers: Not applicable.
- Estimated Impact: Negligible. Query performance will be identical.
*/

DROP VIEW IF EXISTS public.detailed_participations;

CREATE VIEW public.detailed_participations AS
SELECT
    p.id,
    p.program_id,
    p.program_type,
    COALESCE(sp.title, nsp.title, sportsp.title) AS program_name,
    p.student_id,
    s.name AS student_name,
    s.admission_no,
    p.team_id,
    t.name AS team_name,
    p.created_at
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

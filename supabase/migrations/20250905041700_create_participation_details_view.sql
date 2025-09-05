/*
# [Create View: participation_details]
This view simplifies querying participation data by joining multiple tables into a single, easy-to-use source.

## Query Description: [This view combines data from `participations`, `students`, `teams`, and all three program tables (`stage_programs`, `nonstage_programs`, `sports_programs`). It uses COALESCE to select the correct participant name and program title, making frontend queries much simpler and more efficient. This is a read-only operation and does not affect existing data.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- View Name: `public.participation_details`
- Columns: `id`, `created_at`, `program_id`, `program_type`, `student_id`, `team_id`, `program_title`, `participant_name`, `participant_type`

## Security Implications:
- RLS Status: [Not Applicable] - RLS from underlying tables is not automatically applied to views. Access should be controlled via grants or by applying RLS to the view itself if needed.
- Policy Changes: [No]
- Auth Requirements: [Depends on grants given to roles like `authenticated` and `anon`]

## Performance Impact:
- Indexes: [Not Applicable]
- Triggers: [Not Applicable]
- Estimated Impact: [Positive. Reduces the number of queries from the client, improving data fetching performance for the participation list.]
*/

CREATE OR REPLACE VIEW public.participation_details AS
SELECT
    p.id,
    p.created_at,
    p.program_id,
    p.program_type,
    p.student_id,
    p.team_id,
    COALESCE(sp.title, nsp.title, spp.title) AS program_title,
    COALESCE(s.name, t.name) AS participant_name,
    CASE
        WHEN p.student_id IS NOT NULL THEN 'Student'::text
        WHEN p.team_id IS NOT NULL THEN 'Team'::text
        ELSE 'Unknown'::text
    END AS participant_type
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
    public.sports_programs spp ON p.program_id = spp.id AND p.program_type = 'sports';

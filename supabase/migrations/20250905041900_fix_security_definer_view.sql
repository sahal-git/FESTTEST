/*
# [CRITICAL SECURITY FIX] Alter View Security Setting
This migration script addresses a critical security vulnerability by changing the security setting of the `detailed_participations` view from `SECURITY DEFINER` to `SECURITY INVOKER`.

## Query Description:
This operation alters the existing `detailed_participations` view to enforce the permissions and Row-Level Security (RLS) policies of the user querying the view, rather than the user who created it. This is the standard and secure behavior. This change does not affect any data but is critical for ensuring your data access policies are correctly applied.

## Metadata:
- Schema-Category: ["Security", "Structural"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: true (by setting security_invoker to false)

## Structure Details:
- View being affected: `public.detailed_participations`

## Security Implications:
- RLS Status: This change ensures that RLS policies on the underlying tables are correctly enforced.
- Policy Changes: No
- Auth Requirements: This change is essential for a secure authentication and authorization system.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact. This is a metadata change.
*/
ALTER VIEW public.detailed_participations SET (security_invoker = true);

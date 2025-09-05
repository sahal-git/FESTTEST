/*
# [CRITICAL SECURITY FIX] Alter View Security Setting
This script addresses a critical security advisory by altering the `detailed_participations` view to use `SECURITY INVOKER`.

## Query Description:
This operation changes the security model of the `detailed_participations` view. It ensures that any user querying this view will do so with their own permissions, and that your Row-Level Security (RLS) policies are correctly enforced. This fixes a vulnerability where users could potentially access data they are not authorized to see. This change is essential for maintaining data security.

## Metadata:
- Schema-Category: ["Structural", "Safe"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: true (by setting security_invoker to false)

## Structure Details:
- View: public.detailed_participations

## Security Implications:
- RLS Status: This change is required to properly enforce RLS on the view.
- Policy Changes: No
- Auth Requirements: Must be run by a user with permission to alter the view.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact. This is a security and correctness fix.
*/
ALTER VIEW public.detailed_participations SET (security_invoker = true);

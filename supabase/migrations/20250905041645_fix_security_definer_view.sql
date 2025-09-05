/*
# [CRITICAL SECURITY FIX] Alter Security Definer View
This script alters the specified view to use `SECURITY INVOKER` instead of `SECURITY DEFINER`.
This is a critical security fix to ensure that Row-Level Security (RLS) policies are respected for all users.

## Instructions:
1. Replace `YOUR_VIEW_NAME_HERE` below with the actual name of the view that is causing the security error.
   (You should have this name from the diagnostic script I provided earlier).
2. If your view is not in the `public` schema, replace `public` with the correct schema name.
3. Run this script in your Supabase SQL Editor.

## Metadata:
- Schema-Category: ["Structural", "Safe"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: true

## Security Implications:
- RLS Status: Correctly enables RLS enforcement on the view.
- Policy Changes: No
- Auth Requirements: Admin privileges to run ALTER VIEW.
*/

ALTER VIEW public.YOUR_VIEW_NAME_HERE SET (security_invoker = true);

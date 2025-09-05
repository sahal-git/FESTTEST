/*
          # [Security Diagnostic]
          This script helps identify and fix critical security vulnerabilities related to 'SECURITY DEFINER' views. It does not alter data but provides the necessary tools for you to secure your database.

          ## Query Description: 
          - The first query lists all views in the 'public' schema that have the insecure 'SECURITY DEFINER' setting.
          - The second part provides a template command for you to run manually to fix each view identified.
          
          ## Metadata:
          - Schema-Category: ["Safe"]
          - Impact-Level: ["Low"]
          - Requires-Backup: false
          - Reversible: true
          
          ## Instructions:
          1. Run this entire script in your Supabase SQL Editor.
          2. Note the view names returned by the first SELECT query.
          3. For each view name, run the `ALTER VIEW` command provided in the template below.
          */

-- STEP 1: Run this query to find all insecure views.
-- Note the names of any views that are listed in the result.
SELECT
  c.relname AS view_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'v' -- 'v' for view
  AND n.nspname = 'public'
  AND c.reloptions::text LIKE '%security_definer=true%';

-- STEP 2: For each view name you found in Step 1, run the command below.
-- IMPORTANT: You must replace 'YOUR_VIEW_NAME_HERE' with the actual view name.
-- For example, if you found a view named 'my_insecure_view', you would run:
-- ALTER VIEW public.my_insecure_view SET (security_invoker = true);

/*
-- TEMPLATE FOR THE FIX (run this manually for each view found):
ALTER VIEW public.YOUR_VIEW_NAME_HERE SET (security_invoker = true);
*/

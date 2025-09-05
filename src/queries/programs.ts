import { supabase } from "@/integrations/supabase/client";

export const getProgramsCount = async (): Promise<number> => {
  const [stage, nonStage, sports] = await Promise.all([
    supabase.from("stage_programs").select('*', { count: 'exact', head: true }),
    supabase.from("nonstage_programs").select('*', { count: 'exact', head: true }),
    supabase.from("sports_programs").select('*', { count: 'exact', head: true }),
  ]);

  if (stage.error) throw stage.error;
  if (nonStage.error) throw nonStage.error;
  if (sports.error) throw sports.error;

  return (stage.count || 0) + (nonStage.count || 0) + (sports.count || 0);
};

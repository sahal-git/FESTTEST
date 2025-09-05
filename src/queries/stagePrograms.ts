import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type StageProgram = Tables<'stage_programs'>;

export const getStagePrograms = async (): Promise<StageProgram[]> => {
  const { data, error } = await supabase.from("stage_programs").select("*").order("title");
  if (error) throw error;
  return data || [];
};

export const createStageProgram = async (program: TablesInsert<"stage_programs">) => {
  const { data, error } = await supabase.from("stage_programs").insert(program).select().single();
  if (error) throw error;
  return data;
};

export const updateStageProgram = async (id: string, program: TablesUpdate<"stage_programs">) => {
  const { data, error } = await supabase.from("stage_programs").update(program).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteStageProgram = async (id: string) => {
  const { error } = await supabase.from("stage_programs").delete().eq("id", id);
  if (error) throw error;
  return id;
};

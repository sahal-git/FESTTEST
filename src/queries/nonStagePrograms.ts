import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type NonStageProgram = Tables<'nonstage_programs'>;

export const getNonStagePrograms = async (): Promise<NonStageProgram[]> => {
  const { data, error } = await supabase.from("nonstage_programs").select("*").order("title");
  if (error) throw error;
  return data || [];
};

export const createNonStageProgram = async (program: TablesInsert<"nonstage_programs">) => {
  const { data, error } = await supabase.from("nonstage_programs").insert(program).select().single();
  if (error) throw error;
  return data;
};

export const updateNonStageProgram = async (id: string, program: TablesUpdate<"nonstage_programs">) => {
  const { data, error } = await supabase.from("nonstage_programs").update(program).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteNonStageProgram = async (id: string) => {
  const { error } = await supabase.from("nonstage_programs").delete().eq("id", id);
  if (error) throw error;
  return id;
};

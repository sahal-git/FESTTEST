import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type SportsProgram = Tables<'sports_programs'>;

export const getSportsPrograms = async (): Promise<SportsProgram[]> => {
  const { data, error } = await supabase.from("sports_programs").select("*").order("title");
  if (error) throw error;
  return data || [];
};

export const createSportsProgram = async (program: TablesInsert<"sports_programs">) => {
  const { data, error } = await supabase.from("sports_programs").insert(program).select().single();
  if (error) throw error;
  return data;
};

export const updateSportsProgram = async (id: string, program: TablesUpdate<"sports_programs">) => {
  const { data, error } = await supabase.from("sports_programs").update(program).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteSportsProgram = async (id: string) => {
  const { error } = await supabase.from("sports_programs").delete().eq("id", id);
  if (error) throw error;
  return id;
};

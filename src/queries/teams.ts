import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Team = Tables<'teams'>;

export const getTeams = async (): Promise<Team[]> => {
  const { data, error } = await supabase.from("teams").select("*").order("name");
  if (error) throw error;
  return data || [];
};

export const getTeamsCount = async (): Promise<number> => {
  const { count, error } = await supabase.from("teams").select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
};

export const createTeam = async (team: TablesInsert<"teams">) => {
  const { data, error } = await supabase.from("teams").insert(team).select().single();
  if (error) throw error;
  return data;
};

export const updateTeam = async (id: string, team: TablesUpdate<"teams">) => {
  const { data, error } = await supabase.from("teams").update(team).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteTeam = async (id: string) => {
  const { error } = await supabase.from("teams").delete().eq("id", id);
  if (error) throw error;
  return id;
};

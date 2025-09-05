import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Student = Tables<'students'>;
export type StudentWithTeam = Student & {
  teams: { name: string } | null;
};

export const getStudents = async (): Promise<StudentWithTeam[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*, teams(name)")
    .order("name");
  if (error) throw error;
  return (data as StudentWithTeam[]) || [];
};

export const getStudentsCount = async (): Promise<number> => {
  const { count, error } = await supabase.from("students").select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
};

export const createStudent = async (student: TablesInsert<"students">) => {
  const { data, error } = await supabase.from("students").insert(student).select().single();
  if (error) throw error;
  return data;
};

export const updateStudent = async (id: string, student: TablesUpdate<"students">) => {
  const { data, error } = await supabase.from("students").update(student).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteStudent = async (id: string) => {
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw error;
  return id;
};

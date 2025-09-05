export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      nonstage_programs: {
        Row: {
          category: Database["public"]["Enums"]["program_category"]
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      participations: {
        Row: {
          created_at: string | null
          group_name: string | null
          id: string
          program_id: string
          program_type: Database["public"]["Enums"]["program_type"]
          student_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          group_name?: string | null
          id?: string
          program_id: string
          program_type: Database["public"]["Enums"]["program_type"]
          student_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          group_name?: string | null
          id?: string
          program_id?: string
          program_type?: Database["public"]["Enums"]["program_type"]
          student_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          created_at: string | null
          grade: Database["public"]["Enums"]["result_grade"] | null
          id: string
          participation_id: string | null
          points_awarded: number
          position: Database["public"]["Enums"]["result_position"] | null
        }
        Insert: {
          created_at?: string | null
          grade?: Database["public"]["Enums"]["result_grade"] | null
          id?: string
          participation_id?: string | null
          points_awarded?: number
          position?: Database["public"]["Enums"]["result_position"] | null
        }
        Update: {
          created_at?: string | null
          grade?: Database["public"]["Enums"]["result_grade"] | null
          id?: string
          participation_id?: string | null
          points_awarded?: number
          position?: Database["public"]["Enums"]["result_position"] | null
        }
        Relationships: [
          {
            foreignKeyName: "results_participation_id_fkey"
            columns: ["participation_id"]
            isOneToOne: false
            referencedRelation: "participations"
            referencedColumns: ["id"]
          },
        ]
      }
      scoring_rules: {
        Row: {
          default_points: number
          id: number
          position: Database["public"]["Enums"]["result_position"]
        }
        Insert: {
          default_points: number
          id?: number
          position: Database["public"]["Enums"]["result_position"]
        }
        Update: {
          default_points?: number
          id?: number
          position?: Database["public"]["Enums"]["result_position"]
        }
        Relationships: []
      }
      sports_programs: {
        Row: {
          category: Database["public"]["Enums"]["program_category"]
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      stage_programs: {
        Row: {
          category: Database["public"]["Enums"]["program_category"]
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["program_category"]
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          admission_no: string
          category: Database["public"]["Enums"]["student_category"]
          class: string
          created_at: string | null
          fest_id: string
          id: string
          name: string
          team_id: string | null
        }
        Insert: {
          admission_no: string
          category: Database["public"]["Enums"]["student_category"]
          class: string
          created_at?: string | null
          fest_id: string
          id?: string
          name: string
          team_id?: string | null
        }
        Update: {
          admission_no?: string
          category?: Database["public"]["Enums"]["student_category"]
          class?: string
          created_at?: string | null
          fest_id?: string
          id?: string
          name?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      detailed_participations: {
        Row: {
          admission_no: string | null
          created_at: string | null
          id: string
          program_id: string
          program_name: string | null
          program_type: Database["public"]["Enums"]["program_type"]
          student_id: string | null
          student_name: string | null
          team_id: string | null
          team_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      program_category: "junior" | "senior" | "super_senior" | "all"
      program_type: "stage" | "nonstage" | "sports"
      result_grade: "A" | "B" | "C"
      result_position: "1st" | "2nd" | "3rd"
      student_category: "junior" | "senior" | "super_senior"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      program_category: ["junior", "senior", "super_senior", "all"],
      program_type: ["stage", "nonstage", "sports"],
      result_grade: ["A", "B", "C"],
      result_position: ["1st", "2nd", "3rd"],
      student_category: ["junior", "senior", "super_senior"],
    },
  },
} as const

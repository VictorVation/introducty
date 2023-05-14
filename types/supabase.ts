export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Links: {
        Row: {
          created_at: string | null;
          id: number;
          site_id: number | null;
          title: string | null;
          url: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          site_id?: number | null;
          title?: string | null;
          url?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          site_id?: number | null;
          title?: string | null;
          url?: string | null;
          user_id?: string | null;
        };
      };
      Sites: {
        Row: {
          created_at: string | null;
          creator_id: string | null;
          id: number;
          site_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          creator_id?: string | null;
          id?: number;
          site_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          creator_id?: string | null;
          id?: number;
          site_name?: string | null;
        };
      };
      Users: {
        Row: {
          email: string | null;
          id: string;
          name: string | null;
          updated_at: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          name?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Link = Database["public"]["Tables"]["Links"]["Row"];
export type InsertLink = Database["public"]["Tables"]["Links"]["Insert"];
export type UpdateLink = Database["public"]["Tables"]["Links"]["Update"];

export type Site = Database["public"]["Tables"]["Sites"]["Row"];
export type InsertSite = Database["public"]["Tables"]["Sites"]["Insert"];
export type UpdateSite = Database["public"]["Tables"]["Sites"]["Update"];

export type User = Database["public"]["Tables"]["Users"]["Row"];
export type InsertUser = Database["public"]["Tables"]["Users"]["Insert"];
export type UpdateUser = Database["public"]["Tables"]["Users"]["Update"];

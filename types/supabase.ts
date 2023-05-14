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
          title: string | null;
          url: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          title?: string | null;
          url?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          title?: string | null;
          url?: string | null;
          user_id?: string | null;
        };
      };
      Sites: {
        Row: {
          created_at: string | null;
          creator: string | null;
          id: number;
          shortname: string | null;
        };
        Insert: {
          created_at?: string | null;
          creator?: string | null;
          id?: number;
          shortname?: string | null;
        };
        Update: {
          created_at?: string | null;
          creator?: string | null;
          id?: number;
          shortname?: string | null;
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

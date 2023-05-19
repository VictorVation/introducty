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
      links: {
        Row: {
          id: number;
          site_id: string;
          title: string;
          url: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          site_id: string;
          title: string;
          url: string;
          user_id: string;
        };
        Update: {
          id?: number;
          site_id?: string;
          title?: string;
          url?: string;
          user_id?: string;
        };
      };
      site_design: {
        Row: {
          background_type: string;
          gradient_id: string | null;
          id: number;
          image_url: string | null;
          site_id: string;
          solid: string | null;
        };
        Insert: {
          background_type?: string;
          gradient_id?: string | null;
          id?: number;
          image_url?: string | null;
          site_id: string;
          solid?: string | null;
        };
        Update: {
          background_type?: string;
          gradient_id?: string | null;
          id?: number;
          image_url?: string | null;
          site_id?: string;
          solid?: string | null;
        };
      };
      sites: {
        Row: {
          created_at: string;
          creator_id: string | null;
          design: number | null;
          hideBranding: boolean;
          id: string;
          site_name: string;
        };
        Insert: {
          created_at?: string;
          creator_id?: string | null;
          design?: number | null;
          hideBranding?: boolean;
          id?: string;
          site_name: string;
        };
        Update: {
          created_at?: string;
          creator_id?: string | null;
          design?: number | null;
          hideBranding?: boolean;
          id?: string;
          site_name?: string;
        };
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          name?: string | null;
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

export type Link = Database["public"]["Tables"]["links"]["Row"];
export type InsertLink = Database["public"]["Tables"]["links"]["Insert"];
export type UpdateLink = Database["public"]["Tables"]["links"]["Update"];

export type SiteDesign = Database["public"]["Tables"]["site_design"]["Row"];
export type InsertSiteDesign =
  Database["public"]["Tables"]["site_design"]["Insert"];
export type UpdateSiteDesign =
  Database["public"]["Tables"]["site_design"]["Update"];

export type Site = Database["public"]["Tables"]["sites"]["Row"];
export type InsertSite = Database["public"]["Tables"]["sites"]["Insert"];
export type UpdateSite = Database["public"]["Tables"]["sites"]["Update"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type InsertUser = Database["public"]["Tables"]["users"]["Insert"];
export type UpdateUser = Database["public"]["Tables"]["users"]["Update"];

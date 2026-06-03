import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// Database Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: Json
          created_at?: string
          updated_at?: string
        }
      }
      seo_meta: {
        Row: {
          id: string
          page_slug: string
          meta_title: string | null
          meta_description: string | null
          og_title: string | null
          og_description: string | null
          og_image: string | null
          schema_markup: Json | null
          canonical_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_slug: string
          meta_title?: string | null
          meta_description?: string | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          schema_markup?: Json | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_slug?: string
          meta_title?: string | null
          meta_description?: string | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          schema_markup?: Json | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          price_range_min: number | null
          price_range_max: number | null
          category: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          price_range_min?: number | null
          price_range_max?: number | null
          category: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          price_range_min?: number | null
          price_range_max?: number | null
          category?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          quote: string | null
          image_url: string | null
          image_alt: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          quote?: string | null
          image_url?: string | null
          image_alt?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          quote?: string | null
          image_url?: string | null
          image_alt?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

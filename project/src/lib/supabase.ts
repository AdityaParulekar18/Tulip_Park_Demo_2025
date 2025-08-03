import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      flats: {
        Row: {
          id: string
          flat_number: string
          wing: string
          floor: number
          type: string
          area: string
          status: 'owner-occupied' | 'rented' | 'for-rent' | 'for-sale'
          owner_name: string
          owner_phone: string
          owner_email: string
          rent_price: number | null
          sale_price: number | null
          tenant_name: string | null
          tenant_phone: string | null
          tenant_email: string | null
          contract_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          flat_number: string
          wing: string
          floor: number
          type: string
          area: string
          status: 'owner-occupied' | 'rented' | 'for-rent' | 'for-sale'
          owner_name: string
          owner_phone: string
          owner_email: string
          rent_price?: number | null
          sale_price?: number | null
          tenant_name?: string | null
          tenant_phone?: string | null
          tenant_email?: string | null
          contract_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          flat_number?: string
          wing?: string
          floor?: number
          type?: string
          area?: string
          status?: 'owner-occupied' | 'rented' | 'for-rent' | 'for-sale'
          owner_name?: string
          owner_phone?: string
          owner_email?: string
          rent_price?: number | null
          sale_price?: number | null
          tenant_name?: string | null
          tenant_phone?: string | null
          tenant_email?: string | null
          contract_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      event_images: {
        Row: {
          id: string
          event_id: string
          image_url: string
          image_title: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          image_url: string
          image_title: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          image_url?: string
          image_title?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          name: string
          date: string
          description: string
          type: string
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          date: string
          description: string
          type: string
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          date?: string
          description?: string
          type?: string
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pooja_collections: {
          }
      }
  }
}
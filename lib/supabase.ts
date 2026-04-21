import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type PickleballLocation = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip_code: string | null
  lat: number | null
  lng: number | null
  location_type: 'public' | 'private' | 'semi-private' | null
  venue_type: string | null
  court_count: number | null
  surface_type: string | null
  indoor: boolean
  covered: boolean
  indoor_courts: number | null
  outdoor_courts: number | null
  hours_of_operation: Record<string, { open: string; close: string }> | null
  reservation_required: boolean
  reservation_link: string | null
  membership_required: boolean
  drop_in_available: boolean
  lighting: boolean
  restrooms: boolean
  water_fountain: boolean
  parking: string | null
  wheelchair_accessible: boolean
  cost_type: string | null
  cost_details: Record<string, number> | null
  website: string | null
  phone: string | null
  email: string | null
  amenities: string[] | null
  images: string[] | null
  follower_count: number | null
  pickleheads_id: string | null
  pickleheads_slug: string | null
  popularity_score: number
  data_source: string | null
  active: boolean
  verified: boolean
  notes: string | null
  created_at: string
  updated_at: string
  last_scraped_at: string | null
}

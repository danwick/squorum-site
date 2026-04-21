import type { PickleballLocation } from './supabase'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const STATES: Record<string, { name: string; abbrev: string; slug: string }> = {
  MN: { name: 'Minnesota', abbrev: 'MN', slug: 'minnesota' },
  IA: { name: 'Iowa', abbrev: 'IA', slug: 'iowa' },
}

// Reverse lookups
export const STATE_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(STATES).map(([abbrev, s]) => [s.slug, abbrev])
)

export function stateSlugToAbbrev(slug: string): string | undefined {
  return STATE_BY_SLUG[slug]
}

export function stateAbbrevToName(abbrev: string): string {
  return STATES[abbrev]?.name ?? abbrev
}

export function stateAbbrevToSlug(abbrev: string): string {
  return STATES[abbrev]?.slug ?? abbrev.toLowerCase()
}

export function formatCourtCount(location: PickleballLocation): string {
  const indoor = location.indoor_courts
  const outdoor = location.outdoor_courts
  const total = location.court_count

  if (!total && !indoor && !outdoor) return 'Court count unknown'

  const parts: string[] = []
  if (outdoor) parts.push(`${outdoor} outdoor`)
  if (indoor) parts.push(`${indoor} indoor`)

  if (parts.length > 0) {
    const sum = (indoor ?? 0) + (outdoor ?? 0)
    return `${sum} court${sum !== 1 ? 's' : ''} (${parts.join(', ')})`
  }

  return `${total} court${total !== 1 ? 's' : ''}`
}

export function getAccessLabel(location: PickleballLocation): string {
  const parts: string[] = []

  if (location.cost_type === 'free') parts.push('Free')
  else if (location.cost_type === 'membership') parts.push('Membership')
  else if (location.cost_type === 'drop_in') parts.push('Drop-in fee')
  else if (location.cost_type === 'per_hour') parts.push('Hourly rate')

  if (location.location_type === 'public') parts.push('Public')
  else if (location.location_type === 'private') parts.push('Private')
  else if (location.location_type === 'semi-private') parts.push('Semi-private')

  return parts.join(' · ') || ''
}

export function getSurfaceLabel(surface: string | null): string | null {
  if (!surface) return null
  const map: Record<string, string> = {
    concrete: 'Concrete',
    asphalt: 'Asphalt',
    sport_court: 'Sport Court',
    wood: 'Wood',
    composite: 'Composite',
    other: 'Other',
  }
  return map[surface] ?? surface
}

export function getLocationSlug(location: PickleballLocation): string {
  return location.pickleheads_slug || slugify(location.name)
}

export function getCitySlug(city: string): string {
  return slugify(city)
}

export function getCourtUrl(location: PickleballLocation): string {
  const stateSlug = stateAbbrevToSlug(location.state)
  const citySlug = getCitySlug(location.city)
  const courtSlug = getLocationSlug(location)
  return `/courts/${stateSlug}/${citySlug}/${courtSlug}`
}

export function getAmenityLabels(amenities: string[] | null): string[] {
  if (!amenities || amenities.length === 0) return []
  const labelMap: Record<string, string> = {
    restrooms: 'Restrooms',
    water: 'Water fountain',
    water_fountain: 'Water fountain',
    parking: 'Parking',
    lighting: 'Lighting',
    lights: 'Lighting',
    pro_shop: 'Pro shop',
    wheelchair: 'Wheelchair accessible',
    picnic: 'Picnic area',
    playground: 'Playground',
    bleachers: 'Bleachers',
    ball_machine: 'Ball machine',
    lessons: 'Lessons available',
    tournaments: 'Tournaments',
    food: 'Food available',
    drink: 'Drinks available',
    locker_rooms: 'Locker rooms',
    showers: 'Showers',
    wifi: 'WiFi',
  }
  return amenities.map((a) => labelMap[a] ?? a).slice(0, 6)
}

/** Haversine distance in miles */
export function distanceMiles(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 3959
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

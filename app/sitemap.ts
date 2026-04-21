import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { STATES, getCitySlug, getLocationSlug } from '@/lib/court-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://squorum.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/courts`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/policy`, lastModified: new Date(), priority: 0.3 },
  ]

  // Fetch all active courts
  const { data: courts } = await supabase
    .from('pickleball_locations')
    .select('state, city, name, pickleheads_slug, updated_at, last_scraped_at')
    .eq('active', true)

  if (!courts) return staticPages

  // State pages
  const states = new Set(courts.map((c) => c.state))
  const statePages: MetadataRoute.Sitemap = Array.from(states).map((abbrev) => ({
    url: `${baseUrl}/courts/${STATES[abbrev]?.slug ?? abbrev.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  // City pages
  const cityPairs = new Set(courts.map((c) => `${c.state}|${c.city}`))
  const cityPages: MetadataRoute.Sitemap = Array.from(cityPairs).map((pair) => {
    const [abbrev, city] = pair.split('|')
    const stateSlug = STATES[abbrev]?.slug ?? abbrev.toLowerCase()
    return {
      url: `${baseUrl}/courts/${stateSlug}/${getCitySlug(city)}`,
      lastModified: new Date(),
      priority: 0.8,
    }
  })

  // Court detail pages
  const courtPages: MetadataRoute.Sitemap = courts.map((c) => {
    const stateSlug = STATES[c.state]?.slug ?? c.state.toLowerCase()
    const citySlug = getCitySlug(c.city)
    const courtSlug = c.pickleheads_slug || getCitySlug(c.name)
    return {
      url: `${baseUrl}/courts/${stateSlug}/${citySlug}/${courtSlug}`,
      lastModified: c.last_scraped_at ? new Date(c.last_scraped_at) : c.updated_at ? new Date(c.updated_at) : new Date(),
      priority: 0.7,
    }
  })

  return [...staticPages, ...statePages, ...cityPages, ...courtPages]
}

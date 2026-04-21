import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase, type PickleballLocation } from '@/lib/supabase'
import {
  STATES,
  stateSlugToAbbrev,
  stateAbbrevToName,
  stateAbbrevToSlug,
  getCitySlug,
  getLocationSlug,
  getCourtUrl,
  formatCourtCount,
  getAccessLabel,
  getSurfaceLabel,
  distanceMiles,
} from '@/lib/court-utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CourtDetail } from '@/components/court-detail'

export const revalidate = 86400

type Props = { params: Promise<{ state: string; city: string; slug: string }> }

async function getCourt(stateSlug: string, citySlug: string, courtSlug: string) {
  const abbrev = stateSlugToAbbrev(stateSlug)
  if (!abbrev) return null

  const { data } = await supabase
    .from('pickleball_locations')
    .select('*')
    .eq('state', abbrev)
    .eq('active', true)

  if (!data) return null

  // Match by city slug + court slug
  return (data as PickleballLocation[]).find(
    (c) => getCitySlug(c.city) === citySlug && getLocationSlug(c) === courtSlug
  ) ?? null
}

async function getNearbyCourts(court: PickleballLocation, limit = 5) {
  if (!court.lat || !court.lng) return []

  const { data } = await supabase
    .from('pickleball_locations')
    .select('*')
    .eq('active', true)
    .not('lat', 'is', null)
    .not('lng', 'is', null)
    .neq('id', court.id)

  if (!data) return []

  return (data as PickleballLocation[])
    .map((c) => ({
      court: c,
      distance: distanceMiles(court.lat!, court.lng!, c.lat!, c.lng!),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('pickleball_locations')
    .select('state, city, name, pickleheads_slug')
    .eq('active', true)

  if (!data) return []

  return data.map((r) => ({
    state: STATES[r.state]?.slug ?? r.state.toLowerCase(),
    city: getCitySlug(r.city),
    slug: r.pickleheads_slug || getCitySlug(r.name),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug, slug: courtSlug } = await params
  const court = await getCourt(stateSlug, citySlug, courtSlug)
  if (!court) return {}

  const courtCount = formatCourtCount(court)
  const access = getAccessLabel(court)
  const surface = getSurfaceLabel(court.surface_type)

  const descParts = [courtCount, court.indoor ? 'Indoor' : 'Outdoor']
  if (access) descParts.push(access)
  if (surface) descParts.push(surface)

  return {
    title: `${court.name} — Pickleball in ${court.city}, ${court.state}`,
    description: `${descParts.join('. ')}. ${court.address}, ${court.city}, ${stateAbbrevToName(court.state)}.`,
  }
}

export default async function CourtDetailPage({ params }: Props) {
  const { state: stateSlug, city: citySlug, slug: courtSlug } = await params
  const court = await getCourt(stateSlug, citySlug, courtSlug)
  if (!court) notFound()

  const stateName = stateAbbrevToName(court.state)
  const nearby = await getNearbyCourts(court)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: court.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: court.address,
      addressLocality: court.city,
      addressRegion: court.state,
      postalCode: court.zip_code,
      addressCountry: 'US',
    },
    ...(court.lat && court.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: court.lat,
            longitude: court.lng,
          },
        }
      : {}),
    ...(court.phone ? { telephone: court.phone } : {}),
    ...(court.website ? { url: court.website } : {}),
    sport: 'Pickleball',
    isAccessibleForFree: court.cost_type === 'free',
    publicAccess: court.location_type === 'public',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courts', href: '/courts' },
          { label: stateName, href: `/courts/${stateSlug}` },
          { label: court.city, href: `/courts/${stateSlug}/${citySlug}` },
          { label: court.name, href: `/courts/${stateSlug}/${citySlug}/${courtSlug}` },
        ]}
      />

      <h1 className="text-3xl font-bold mb-1">{court.name}</h1>
      <p className="text-muted-foreground mb-6">
        {court.address}, {court.city}, {stateName}
      </p>

      <CourtDetail court={court} />

      {/* Nearby courts */}
      {nearby.length > 0 && (
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="text-lg font-semibold mb-4">Nearby Courts</h2>
          <div className="space-y-3">
            {nearby.map(({ court: c, distance }) => (
              <Link
                key={c.id}
                href={getCourtUrl(c)}
                className="flex items-center justify-between border border-border rounded-lg p-3 hover:border-foreground/20 transition-colors"
              >
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.city}, {c.state}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {distance.toFixed(1)} mi
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

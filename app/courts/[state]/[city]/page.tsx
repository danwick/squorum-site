import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase, type PickleballLocation } from '@/lib/supabase'
import {
  STATES,
  stateSlugToAbbrev,
  stateAbbrevToName,
  getCitySlug,
  getCourtUrl,
} from '@/lib/court-utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CourtCard } from '@/components/court-card'

export const revalidate = 86400

type Props = { params: Promise<{ state: string; city: string }> }

export async function generateStaticParams() {
  const { data } = await supabase
    .from('pickleball_locations')
    .select('state, city')
    .eq('active', true)

  if (!data) return []

  const pairs = new Set(data.map((r) => `${r.state}|${r.city}`))
  return Array.from(pairs).map((pair) => {
    const [abbrev, city] = pair.split('|')
    return {
      state: STATES[abbrev]?.slug ?? abbrev.toLowerCase(),
      city: getCitySlug(city),
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params
  const abbrev = stateSlugToAbbrev(stateSlug)
  if (!abbrev) return {}

  // Find original city name from DB
  const { data } = await supabase
    .from('pickleball_locations')
    .select('city')
    .eq('state', abbrev)
    .eq('active', true)
    .limit(500)

  const cityName = data?.find((r) => getCitySlug(r.city) === citySlug)?.city
  if (!cityName) return {}

  return {
    title: `Pickleball Courts in ${cityName}, ${abbrev}`,
    description: `Find pickleball courts in ${cityName}, ${stateAbbrevToName(abbrev)}. Indoor and outdoor courts with amenities, cost, and availability details.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params
  const abbrev = stateSlugToAbbrev(stateSlug)
  if (!abbrev) notFound()

  const stateName = stateAbbrevToName(abbrev)

  // Fetch all courts in this state, filter by city slug match
  const { data: allCourts } = await supabase
    .from('pickleball_locations')
    .select('*')
    .eq('state', abbrev)
    .eq('active', true)
    .order('follower_count', { ascending: false, nullsFirst: false })
    .order('popularity_score', { ascending: false })

  if (!allCourts) notFound()

  const courts = allCourts.filter(
    (c) => getCitySlug(c.city) === citySlug
  ) as PickleballLocation[]

  if (courts.length === 0) notFound()

  const cityName = courts[0].city

  // Find other cities in this state for "nearby cities" section
  const otherCities = new Set(
    allCourts
      .filter((c) => getCitySlug(c.city) !== citySlug)
      .map((c) => c.city)
  )
  const nearbyCities = Array.from(otherCities).slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Pickleball Courts in ${cityName}, ${abbrev}`,
    numberOfItems: courts.length,
    itemListElement: courts.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `https://squorum.com${getCourtUrl(c)}`,
    })),
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courts', href: '/courts' },
          { label: stateName, href: `/courts/${stateSlug}` },
          { label: cityName, href: `/courts/${stateSlug}/${citySlug}` },
        ]}
      />

      <h1 className="text-3xl font-bold mb-2">
        Pickleball Courts in {cityName}, {abbrev}
      </h1>
      <p className="text-muted-foreground mb-8">
        {courts.length} pickleball court{courts.length !== 1 ? 's' : ''} in{' '}
        {cityName}.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-3">
            Nearby Cities in {stateName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map((city) => (
              <a
                key={city}
                href={`/courts/${stateSlug}/${getCitySlug(city)}`}
                className="text-sm border border-border rounded px-3 py-1.5 hover:border-foreground/20 transition-colors"
              >
                {city}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

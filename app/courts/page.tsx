import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { STATES, stateAbbrevToSlug } from '@/lib/court-utils'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Find Pickleball Courts Near You',
  description:
    'Browse pickleball courts across Minnesota and Iowa. Indoor and outdoor courts, free and paid, with full details on amenities and availability.',
}

type StateSummary = {
  state: string
  count: number
  cities: number
  indoor: number
  outdoor: number
}

async function getStateSummaries(): Promise<StateSummary[]> {
  const { data } = await supabase
    .from('pickleball_locations')
    .select('state, indoor')
    .eq('active', true)

  if (!data) return []

  const byState: Record<string, { count: number; indoor: number; outdoor: number; cities: Set<string> }> = {}

  // We need city data too — fetch separately for the city count
  const { data: cityData } = await supabase
    .from('pickleball_locations')
    .select('state, city')
    .eq('active', true)

  const cityMap: Record<string, Set<string>> = {}
  for (const row of cityData ?? []) {
    if (!cityMap[row.state]) cityMap[row.state] = new Set()
    cityMap[row.state].add(row.city)
  }

  for (const row of data) {
    if (!byState[row.state]) {
      byState[row.state] = { count: 0, indoor: 0, outdoor: 0, cities: new Set() }
    }
    byState[row.state].count++
    if (row.indoor) byState[row.state].indoor++
    else byState[row.state].outdoor++
  }

  return Object.entries(byState)
    .map(([state, stats]) => ({
      state,
      count: stats.count,
      cities: cityMap[state]?.size ?? 0,
      indoor: stats.indoor,
      outdoor: stats.outdoor,
    }))
    .sort((a, b) => b.count - a.count)
}

export default async function CourtsHubPage() {
  const states = await getStateSummaries()
  const totalCourts = states.reduce((sum, s) => sum + s.count, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pickleball Courts by State',
    numberOfItems: states.length,
    itemListElement: states.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Pickleball Courts in ${STATES[s.state]?.name ?? s.state}`,
      url: `https://squorum.com/courts/${stateAbbrevToSlug(s.state)}`,
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
        ]}
      />

      <h1 className="text-3xl font-bold mb-2">Find Pickleball Courts Near You</h1>
      <p className="text-muted-foreground mb-8">
        Browse {totalCourts.toLocaleString()} pickleball courts across {states.length} states.
        Find indoor and outdoor courts with details on amenities, cost, and availability.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {states.map((s) => {
          const stateInfo = STATES[s.state]
          const name = stateInfo?.name ?? s.state
          const slug = stateInfo?.slug ?? s.state.toLowerCase()

          return (
            <Link
              key={s.state}
              href={`/courts/${slug}`}
              className="border border-border rounded-lg p-5 hover:border-foreground/20 transition-colors"
            >
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {s.count} courts across {s.cities} cities
              </p>
              <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
                <span>{s.outdoor} outdoor</span>
                <span>{s.indoor} indoor</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  STATES,
  stateSlugToAbbrev,
  stateAbbrevToName,
  getCitySlug,
} from '@/lib/court-utils'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const revalidate = 86400

type Props = { params: Promise<{ state: string }> }

export async function generateStaticParams() {
  const { data } = await supabase
    .from('pickleball_locations')
    .select('state')
    .eq('active', true)

  const states = new Set((data ?? []).map((r) => r.state))
  return Array.from(states).map((abbrev) => ({
    state: STATES[abbrev]?.slug ?? abbrev.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const abbrev = stateSlugToAbbrev(stateSlug)
  if (!abbrev) return {}
  const name = stateAbbrevToName(abbrev)

  return {
    title: `Pickleball Courts in ${name}`,
    description: `Find pickleball courts in ${name}. Browse by city for indoor and outdoor courts, amenities, and availability.`,
  }
}

type CitySummary = {
  city: string
  slug: string
  count: number
  indoor: number
  outdoor: number
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const abbrev = stateSlugToAbbrev(stateSlug)
  if (!abbrev) notFound()

  const stateName = stateAbbrevToName(abbrev)

  const { data } = await supabase
    .from('pickleball_locations')
    .select('city, indoor')
    .eq('state', abbrev)
    .eq('active', true)

  if (!data || data.length === 0) notFound()

  const byCity: Record<string, { count: number; indoor: number; outdoor: number }> = {}
  for (const row of data) {
    if (!byCity[row.city]) byCity[row.city] = { count: 0, indoor: 0, outdoor: 0 }
    byCity[row.city].count++
    if (row.indoor) byCity[row.city].indoor++
    else byCity[row.city].outdoor++
  }

  const cities: CitySummary[] = Object.entries(byCity)
    .map(([city, stats]) => ({
      city,
      slug: getCitySlug(city),
      ...stats,
    }))
    .sort((a, b) => b.count - a.count)

  const totalCourts = cities.reduce((sum, c) => sum + c.count, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Pickleball Courts in ${stateName}`,
    numberOfItems: cities.length,
    itemListElement: cities.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Pickleball Courts in ${c.city}, ${abbrev}`,
      url: `https://squorum.com/courts/${stateSlug}/${c.slug}`,
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
        ]}
      />

      <h1 className="text-3xl font-bold mb-2">Pickleball Courts in {stateName}</h1>
      <p className="text-muted-foreground mb-8">
        {totalCourts} pickleball courts across {cities.length} cities in {stateName}.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <Link
            key={c.city}
            href={`/courts/${stateSlug}/${c.slug}`}
            className="border border-border rounded-lg p-4 hover:border-foreground/20 transition-colors"
          >
            <h2 className="font-semibold">{c.city}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {c.count} court{c.count !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
              {c.outdoor > 0 && <span>{c.outdoor} outdoor</span>}
              {c.indoor > 0 && <span>{c.indoor} indoor</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

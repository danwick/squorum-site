import Link from 'next/link'
import type { PickleballLocation } from '@/lib/supabase'
import { formatCourtCount, getAccessLabel, getSurfaceLabel, getCourtUrl } from '@/lib/court-utils'

export function CourtCard({ court }: { court: PickleballLocation }) {
  const access = getAccessLabel(court)
  const surface = getSurfaceLabel(court.surface_type)
  const courtCount = formatCourtCount(court)

  return (
    <Link
      href={getCourtUrl(court)}
      className="block border border-border rounded-lg p-4 hover:border-foreground/20 transition-colors"
    >
      <h3 className="font-semibold text-base">{court.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {court.address}, {court.city}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
          {courtCount}
        </span>
        {court.indoor && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            Indoor
          </span>
        )}
        {surface && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            {surface}
          </span>
        )}
        {access && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            {access}
          </span>
        )}
      </div>
    </Link>
  )
}

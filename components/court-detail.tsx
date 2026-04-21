import type { PickleballLocation } from '@/lib/supabase'
import {
  formatCourtCount,
  getAccessLabel,
  getSurfaceLabel,
  getAmenityLabels,
  stateAbbrevToName,
} from '@/lib/court-utils'

export function CourtDetail({ court }: { court: PickleballLocation }) {
  const access = getAccessLabel(court)
  const surface = getSurfaceLabel(court.surface_type)
  const courtCount = formatCourtCount(court)
  const amenities = getAmenityLabels(court.amenities)
  const stateName = stateAbbrevToName(court.state)

  return (
    <article>
      {/* Key facts grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <Fact label="Courts" value={courtCount} />
        {surface && <Fact label="Surface" value={surface} />}
        <Fact label="Setting" value={court.indoor ? 'Indoor' : 'Outdoor'} />
        {access && <Fact label="Access" value={access} />}
        {court.lighting && <Fact label="Lighting" value="Yes" />}
        {court.reservation_required && <Fact label="Reservations" value="Required" />}
      </div>

      {/* Overview */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          {court.name} is a {court.location_type ?? 'pickleball'} facility located at{' '}
          {court.address} in {court.city}, {stateName}.{' '}
          {court.court_count
            ? `The venue features ${courtCount.toLowerCase()}.`
            : ''}{' '}
          {court.indoor
            ? 'Indoor courts provide year-round play regardless of weather.'
            : court.covered
              ? 'Courts are covered for weather protection.'
              : 'Outdoor courts are weather-dependent.'}
        </p>
      </section>

      {/* Court details */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Court Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {court.court_count != null && (
            <div>
              <dt className="text-muted-foreground">Total courts</dt>
              <dd>{court.court_count}</dd>
            </div>
          )}
          {court.indoor_courts != null && (
            <div>
              <dt className="text-muted-foreground">Indoor courts</dt>
              <dd>{court.indoor_courts}</dd>
            </div>
          )}
          {court.outdoor_courts != null && (
            <div>
              <dt className="text-muted-foreground">Outdoor courts</dt>
              <dd>{court.outdoor_courts}</dd>
            </div>
          )}
          {surface && (
            <div>
              <dt className="text-muted-foreground">Surface</dt>
              <dd>{surface}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground">Lighting</dt>
            <dd>{court.lighting ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </section>

      {/* Access & cost */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Access & Cost</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {court.cost_type && (
            <div>
              <dt className="text-muted-foreground">Cost</dt>
              <dd className="capitalize">{court.cost_type.replace('_', ' ')}</dd>
            </div>
          )}
          {court.location_type && (
            <div>
              <dt className="text-muted-foreground">Access type</dt>
              <dd className="capitalize">{court.location_type}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground">Drop-in</dt>
            <dd>{court.drop_in_available ? 'Available' : 'Not available'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Reservations</dt>
            <dd>{court.reservation_required ? 'Required' : 'Not required'}</dd>
          </div>
        </dl>
        {court.reservation_link && (
          <a
            href={court.reservation_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Reserve a Court
          </a>
        )}
      </section>

      {/* Amenities */}
      {amenities.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {amenities.map((a) => (
              <span
                key={a}
                className="text-sm bg-secondary text-secondary-foreground px-2.5 py-1 rounded"
              >
                {a}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      {(court.website || court.phone || court.email) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <dl className="text-sm space-y-1">
            {court.website && (
              <div>
                <dt className="text-muted-foreground inline">Website: </dt>
                <dd className="inline">
                  <a
                    href={court.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {new URL(court.website).hostname}
                  </a>
                </dd>
              </div>
            )}
            {court.phone && (
              <div>
                <dt className="text-muted-foreground inline">Phone: </dt>
                <dd className="inline">{court.phone}</dd>
              </div>
            )}
            {court.email && (
              <div>
                <dt className="text-muted-foreground inline">Email: </dt>
                <dd className="inline">{court.email}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
    </article>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-md px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-0.5">{value}</div>
    </div>
  )
}

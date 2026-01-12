import { ResourceWeek } from '../types/resource'
import { Resource } from '@schedule-x/shared/src/types/calendar/resource'
import ResourceDateGridDay from './resource-date-grid-day'

type props = {
  resourceWeek: ResourceWeek
  dates: string[]
  resources: Resource[]
}

export default function ResourceDateGrid({
  resourceWeek,
  dates,
  resources,
}: props) {
  return (
    <div
      className="sx__resource-date-grid"
      aria-label="Full day- and multiple day events"
    >
      {dates.map((dateString) =>
        resources.map((resource) => {
          const slot = resourceWeek[dateString]?.[resource.id]
          if (!slot) return null

          return (
            <ResourceDateGridDay
              key={`${dateString}-${resource.id}`}
              calendarEvents={slot.dateGridEvents}
              date={dateString}
              resource={resource}
            />
          )
        })
      )}
    </div>
  )
}

import { Week } from '../types/week'
import { Resource } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import DateGridResourceDay from './date-grid-resource-day'

type props = {
  weekDates: string[]
  sortedResources: Resource[]
  weekByResource: Record<string, Week>
  $app: CalendarAppSingleton
}

export default function DateGridResource({
  weekDates,
  sortedResources,
  weekByResource,
  $app,
}: props) {
  return (
    <div className="sx__date-grid-resource">
      {weekDates.map((date) => (
        <div key={date} className="sx__date-grid-resource-day">
          {sortedResources.map((resource, resourceIndex) => {
            const resourceWeek = weekByResource[resource.id]
            const resourceDay = resourceWeek?.[date]
            const isLastResource = resourceIndex === sortedResources.length - 1

            return (
              <div
                key={`${date}-${resource.id}`}
                className="sx__date-grid-resource-column"
                data-resource-id={resource.id}
                data-is-last-resource={isLastResource}
              >
                <DateGridResourceDay
                  calendarEvents={resourceDay?.dateGridEvents || {}}
                  date={date}
                  $app={$app}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

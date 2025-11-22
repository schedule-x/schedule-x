import { Resource } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

type props = {
  weekDates: string[]
  sortedResources: Resource[]
}

export default function ResourceAxis({ weekDates, sortedResources }: props) {
  const isLastDay = weekDates.length - 1
  const isLastResource = sortedResources.length - 1

  return (
    <div className="sx__time-grid-resource-axis">
      {weekDates.map((date, dayIndex) => (
        <div key={date} className="sx__time-grid-resource-axis-day">
          {sortedResources.map((resource, resourceIndex) => {
            const isLastResourceInLastDay =
              dayIndex === isLastDay && resourceIndex === isLastResource

            return (
              <div
                key={`${date}-${resource.id}`}
                className="sx__time-grid-resource-axis-header"
                data-resource-id={resource.id}
                data-is-last-resource-in-last-day={isLastResourceInLastDay}
              >
                {resource.label}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Resource } from '@schedule-x/shared/src/types/calendar/resource'
import { useContext } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import ResourceDateGridEvent from './resource-date-grid-event'

type props = {
  calendarEvents: CalendarEventInternal[]
  date: string
  resource: Resource
}

export default function ResourceDateGridDay({
  calendarEvents,
  date,
  resource,
}: props) {
  const $app = useContext(AppContext)

  const handleMouseDown = (e: MouseEvent) => {
    const callback = $app.config.callbacks.onMouseDownDateGridDate
    if (!callback) return

    callback(Temporal.PlainDate.from(date), e)
  }

  return (
    <div
      className="sx__resource-date-grid-day"
      data-date-grid-date={date}
      data-resource-id={resource.id}
    >
      {calendarEvents.map((event) => (
        <ResourceDateGridEvent
          key={`${event.id}-${date}-${resource.id}`}
          calendarEvent={event}
        />
      ))}

      <div className="sx__spacer" onMouseDown={handleMouseDown} />
    </div>
  )
}

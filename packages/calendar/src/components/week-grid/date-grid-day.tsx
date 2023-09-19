import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import DateGridEvent from './date-grid-event'

type props = {
  calendarEvents: (CalendarEventInternal | 'blocker' | null)[]
}

export default function DateGridDay({ calendarEvents }: props) {
  return (
    <div className="sx__date-grid-day">
      {calendarEvents.map((event, index) => {
        if (event === 'blocker' || event === null)
          return <div className="sx__date-grid-cell"></div>

        return <DateGridEvent calendarEvent={event} gridRow={index + 1} />
      })}
    </div>
  )
}

import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import DateGridEvent from './date-grid-event'
import { DATE_GRID_BLOCKER } from '../../constants'

type props = {
  calendarEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
}

export default function DateGridDay({ calendarEvents }: props) {
  return (
    <div className="sx__date-grid-day">
      {Object.values(calendarEvents).map((event, index) => {
        if (event === DATE_GRID_BLOCKER || !event)
          return <div className="sx__date-grid-cell"></div>

        return <DateGridEvent calendarEvent={event} gridRow={index + 1} />
      })}
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import DateGridEvent from './date-grid-event'
import { DATE_GRID_BLOCKER } from '../../constants'

type props = {
  calendarEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
  date: string
}

export default function DateGridDay({ calendarEvents, date }: props) {
  return (
    <div className="sx__date-grid-day" data-date-grid-date={date}>
      {Object.values(calendarEvents).map((event, index) => {
        if (event === DATE_GRID_BLOCKER || !event)
          return (
            <div
              className="sx__date-grid-cell"
              style={{ gridRow: index + 1 }}
            ></div>
          )

        return <DateGridEvent calendarEvent={event} gridRow={index + 1} />
      })}
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import DateGridEvent from './date-grid-event'
import { DATE_GRID_BLOCKER } from '../../constants'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { dateStringRegex } from '@schedule-x/shared/src'

type props = {
  calendarEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
  backgroundEvents: BackgroundEvent[]
  date: string
}

export default function DateGridDay({
  calendarEvents,
  date,
  backgroundEvents,
}: props) {
  const dateStart = date + ' 00:00'
  const dateEnd = date + ' 23:59'

  const fullDayBackgroundEvent = backgroundEvents.find((event) => {
    const eventStartWithTime = dateStringRegex.test(event.start)
      ? event.start + ' 00:00'
      : event.start
    const eventEndWithTime = dateStringRegex.test(event.end)
      ? event.end + ' 23:59'
      : event.end
    return eventStartWithTime <= dateStart && eventEndWithTime >= dateEnd
  })

  return (
    <div className="sx__date-grid-day" data-date-grid-date={date}>
      {fullDayBackgroundEvent && (
        <div
          className="sx__date-grid-background-event"
          title={fullDayBackgroundEvent.title}
          style={{
            ...fullDayBackgroundEvent.style,
          }}
        />
      )}

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

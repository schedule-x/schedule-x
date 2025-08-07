import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import DateGridEvent from './date-grid-event'
import { DATE_GRID_BLOCKER } from '../../constants'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'

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
  const $app = useContext(AppContext)
  const dateStart = Temporal.ZonedDateTime.from({
    year: Temporal.PlainDate.from(date).year,
    month: Temporal.PlainDate.from(date).month,
    day: Temporal.PlainDate.from(date).day,
    hour: 0,
    minute: 0,
    second: 0,
    timeZone: $app.config.timezone.value,
  })
  const dateEnd = Temporal.ZonedDateTime.from({
    year: Temporal.PlainDate.from(date).year,
    month: Temporal.PlainDate.from(date).month,
    day: Temporal.PlainDate.from(date).day,
    hour: 23,
    minute: 59,
    second: 59,
    timeZone: $app.config.timezone.value,
  })

  const fullDayBackgroundEvent = backgroundEvents.find((event) => {
    const eventStartWithTime =
      event.start instanceof Temporal.PlainDate
        ? event.start.toZonedDateTime($app.config.timezone.value)
        : event.start
    const eventEndWithTime =
      event.end instanceof Temporal.PlainDate
        ? event.end.toZonedDateTime($app.config.timezone.value).with({
            hour: 23,
            minute: 59,
            second: 59,
          })
        : event.end
    return (
      eventStartWithTime.toString() <= dateStart.toString() &&
      eventEndWithTime.toString() >= dateEnd.toString()
    )
  })

  const handleMouseDown = (e: MouseEvent) => {
    const callback = $app.config.callbacks.onMouseDownDateGridDate
    if (!callback) return

    callback(Temporal.PlainDate.from(date), e)
  }

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
              onMouseDown={handleMouseDown}
            ></div>
          )

        return (
          <DateGridEvent
            calendarEvent={event}
            gridRow={index + 1}
            key={event.start.toString() + event.end.toString() + index}
          />
        )
      })}

      <div className={'sx__spacer'} onMouseDown={handleMouseDown} />
    </div>
  )
}

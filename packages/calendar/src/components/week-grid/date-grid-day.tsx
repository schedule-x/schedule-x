import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import DateGridEvent from './date-grid-event'
import { DATE_GRID_BLOCKER } from '../../constants'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

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
  const { year, month, date: day } = toIntegers(date)
  const dateTemporal = Temporal.PlainDate.from({
    year,
    month: month + 1,
    day,
    calendar: $app.config.calendarSystem.value,
  })
  
  const dateStart = Temporal.ZonedDateTime.from({
    year: dateTemporal.year,
    month: dateTemporal.month,
    day: dateTemporal.day,
    hour:
      $app.config.dayBoundaries.value.start === 0
        ? 0
        : $app.config.dayBoundaries.value.start / 100,
    minute: 0,
    second: 0,
    timeZone: $app.config.timezone.value,
    calendar: $app.config.calendarSystem.value,
  })
  let dateEnd = Temporal.ZonedDateTime.from({
    year: dateTemporal.year,
    month: dateTemporal.month,
    day: dateTemporal.day,
    hour:
      $app.config.dayBoundaries.value.end === 2400
        ? 23
        : $app.config.dayBoundaries.value.end / 100,
    minute: $app.config.dayBoundaries.value.end === 2400 ? 59 : 0,
    second: $app.config.dayBoundaries.value.end === 2400 ? 59 : 0,
    timeZone: $app.config.timezone.value,
    calendar: $app.config.calendarSystem.value,
  })
  if ($app.config.isHybridDay) {
    dateEnd = dateEnd.add({ days: 1 })
  }

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

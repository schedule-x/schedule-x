import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/hooks'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { getEventHeight } from '../../utils/stateless/events/event-styles'
import {
  timePointsFromString,
  timeStringFromTimePoints,
} from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'


type props = {
  backgroundEvent: BackgroundEvent
  date: string
}

export default function TimeGridBackgroundEvent({
  backgroundEvent,
  date,
}: props) {
  const $app = useContext(AppContext)
  let start = backgroundEvent.start
  let end = backgroundEvent.end
  const startIsAnotherDate = !isSameDay(start, Temporal.PlainDate.from(date))
  const endIsAnotherDate = !isSameDay(end, Temporal.PlainDate.from(date))

  // get YYYY-MM-DD from start and end and add 00:00 or 23:59, if the date is not the same as the date of the background event
  // or if it's a full-day event
  if (startIsAnotherDate || start instanceof Temporal.PlainDate) {
    start = Temporal.ZonedDateTime.from({
      year: Temporal.PlainDate.from(date).year,
      month: Temporal.PlainDate.from(date).month,
      day: Temporal.PlainDate.from(date).day,
      hour: 0,
      minute: 0,
      second: 0,
      timeZone: $app.config.timezone.value,
    })
  }
  if (endIsAnotherDate || end instanceof Temporal.PlainDate) {
    end = Temporal.ZonedDateTime.from({
      year: Temporal.PlainDate.from(date).year,
      month: Temporal.PlainDate.from(date).month,
      day: Temporal.PlainDate.from(date).day,
      hour: 23,
      minute: 59,
      second: 59,
      timeZone: $app.config.timezone.value,
    })
  }

  // adjust the start time according to the day boundaries
  // otherwise the background event `top` is calculated incorrectly
  const startHour = start.hour
  const startMinute = start.minute
  const formattedStart = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`
  const startTimePoints = timePointsFromString(formattedStart)
  if (startTimePoints < $app.config.dayBoundaries.value.start) {
    const updatedStart = timeStringFromTimePoints($app.config.dayBoundaries.value.start)
    const updatedStartHour = updatedStart.split(':')[0]
    const updatedStartMinute = updatedStart.split(':')[1]
    start = Temporal.ZonedDateTime.from({
      year: Temporal.PlainDate.from(date).year,
      month: Temporal.PlainDate.from(date).month,
      day: Temporal.PlainDate.from(date).day,
      hour: +updatedStartHour,
      minute: +updatedStartMinute,
      second: 0,
      timeZone: $app.config.timezone.value,
    })
  }

  // when start and end datetimes are equal, the rendering of the background event can be skipped completely.
  // otherwise, `height` is calculated as 5% (by `getEventHeight`) and this is misleading for a background event like "out-of-office" hours.
  // This comparison is safe also for full-day background events, because earlier in code we add time (00:00 - 23:59) to full-day events, making start and end no longer equal in full-day event case.
  if (start === end) {
    return null
  }

  return (
    <>
      <div
        class="sx__time-grid-background-event"
        title={backgroundEvent.title}
        style={{
          ...backgroundEvent.style,
          position: 'absolute',
          zIndex: 0,
          top: `${getYCoordinateInTimeGrid(start, $app.config.dayBoundaries.value, $app.config.timePointsPerDay)}%`,
          height: `${getEventHeight(
            start,
            end,
            $app.config.dayBoundaries.value,
            $app.config.timePointsPerDay
          )}%`,
          width: '100%',
        }}
      />
    </>
  )
}

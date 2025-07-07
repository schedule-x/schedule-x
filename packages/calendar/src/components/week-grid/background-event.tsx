import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { dateStringRegex } from '@schedule-x/shared/src'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/hooks'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { getEventHeight } from '../../utils/stateless/events/event-styles'
import {
  timePointsFromString,
  timeStringFromTimePoints,
} from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

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
  const startIsAnotherDate = dateFromDateTime(start) !== date
  const endIsAnotherDate = dateFromDateTime(end) !== date

  // get YYYY-MM-DD from start and end and add 00:00 or 23:59, if the date is not the same as the date of the background event
  // or if it's a full-day event
  if (dateStringRegex.test(start) || startIsAnotherDate)
    start = start.substring(0, 10) + ' 00:00'
  if (dateStringRegex.test(end) || endIsAnotherDate)
    end = end.substring(0, 10) + ' 23:59'

  // The date in event.start and event.end does not necessarily have to be during this date, since it might start before
  // this date or end after. Nonetheless, it should appear as an event from 00:00 to 23:59 on this date in that case, and thus the start- and end-dates might have to be adjusted.
  if (startIsAnotherDate) start = date + ' ' + start.split(' ')[1]
  if (endIsAnotherDate) end = date + ' ' + end.split(' ')[1]

  // adjust the start time according to the day boundaries
  // otherwise the background event `top` is calculated incorrectly
  const startTimePoints = timePointsFromString(start.split(' ')[1])
  if (startTimePoints < $app.config.dayBoundaries.value.start) {
    start =
      date +
      ' ' +
      timeStringFromTimePoints($app.config.dayBoundaries.value.start)
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

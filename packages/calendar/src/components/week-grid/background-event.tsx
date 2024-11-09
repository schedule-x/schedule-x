import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { dateStringRegex } from '@schedule-x/shared/src'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { AppContext } from '../../utils/stateful/app-context'
import { useContext } from 'preact/hooks'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { getEventHeight } from '../../utils/stateless/events/event-styles'

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
  if (dateStringRegex.test(start)) start += ' 00:00'
  if (dateStringRegex.test(end)) end += ' 23:59'

  // make sure the date is correct
  if (dateFromDateTime(start) !== date) start = date + ' ' + start.split(' ')[1]
  if (dateFromDateTime(end) !== date) end = date + ' ' + end.split(' ')[1]

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

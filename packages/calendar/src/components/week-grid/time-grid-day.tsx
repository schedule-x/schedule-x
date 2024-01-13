import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import TimeGridEvent from './time-grid-event'
import { sortEventsByStart } from '../../utils/stateless/events/sort-by-start-date'
import { handleEventConcurrency } from '../../utils/stateless/events/event-concurrency'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { setTimeInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getClickDateTime } from '../../utils/stateless/time/grid-click-to-datetime/grid-click-to-datetime'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'

type props = {
  calendarEvents: CalendarEventInternal[]
  date: string
}

export default function TimeGridDay({ calendarEvents, date }: props) {
  const $app = useContext(AppContext)

  const timeStringFromDayBoundary = timeStringFromTimePoints(
    $app.config.dayBoundaries.start
  )
  const timeStringFromDayBoundaryEnd = timeStringFromTimePoints(
    $app.config.dayBoundaries.end
  )
  const dayStartDateTime = setTimeInDateTimeString(
    date,
    timeStringFromDayBoundary
  )
  const dayEndDateTime = $app.config.isHybridDay
    ? addDays(setTimeInDateTimeString(date, timeStringFromDayBoundaryEnd), 1)
    : setTimeInDateTimeString(date, timeStringFromDayBoundaryEnd)

  const dayBoundariesDateTime: DayBoundariesDateTime = {
    start: dayStartDateTime,
    end: dayEndDateTime,
  }

  const sortedEvents = calendarEvents.sort(sortEventsByStart)
  const eventsWithConcurrency = handleEventConcurrency(sortedEvents)

  const handleOnClick = (e: MouseEvent) => {
    if (!$app.config.callbacks.onClickDateTime) return

    const clickDateTime = getClickDateTime(e, $app, dayStartDateTime)
    if (clickDateTime) {
      $app.config.callbacks.onClickDateTime(clickDateTime)
    }
  }

  return (
    <div
      className="sx__time-grid-day"
      onClick={handleOnClick}
      aria-label={getLocalizedDate(date, $app.config.locale)}
    >
      {eventsWithConcurrency.map((event) => (
        <TimeGridEvent
          key={event.id}
          calendarEvent={event}
          dayBoundariesDateTime={dayBoundariesDateTime}
        />
      ))}
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { timePointsPerDay } from '@schedule-x/shared/src/utils/stateless/time/time-points/time-points-per-day'
import TimeGridEvent from './time-grid-event'
import { sortEventsByStart } from '../../utils/stateless/events/sort-by-start-date'
import { handleEventConcurrency } from '../../utils/stateless/events/event-concurrency'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { setTimeInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'

type props = {
  calendarEvents: CalendarEventInternal[]
  date: string
}

export default function TimeGridDay({ calendarEvents, date }: props) {
  const $app = useContext(AppContext)
  const pointsPerDay = $app.config.timePointsPerDay

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

  return (
    <div className="sx__time-grid-day">
      {eventsWithConcurrency.map((event) => (
        <TimeGridEvent
          key={event.id}
          calendarEvent={event}
          timePoints={pointsPerDay}
          dayBoundariesDateTime={dayBoundariesDateTime}
        />
      ))}
    </div>
  )
}

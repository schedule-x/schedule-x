import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { timePointsPerDay } from '../../utils/stateless/time/time-points/time-points-per-day'
import WeekDayEvent from './week-day-event'
import { sortEventsByStart } from '../../utils/stateless/events/sort-events'
import { handleEventConcurrency } from '../../utils/stateless/events/event-concurrency'

type props = {
  calendarEvents: CalendarEventInternal[]
}

export default function WeekDay({ calendarEvents }: props) {
  const $app = useContext(AppContext)
  const pointsPerDay = timePointsPerDay(
    $app.config.dayBoundaries.start,
    $app.config.dayBoundaries.end,
    $app.config.isHybridDay
  )

  const sortedEvents = calendarEvents.sort(sortEventsByStart)
  const eventsWithConcurrency = handleEventConcurrency(sortedEvents)

  return (
    <div className="sx__week-day">
      {eventsWithConcurrency.map((event) => (
        <WeekDayEvent
          key={event.id}
          calendarEvent={event}
          timePoints={pointsPerDay}
        />
      ))}
    </div>
  )
}

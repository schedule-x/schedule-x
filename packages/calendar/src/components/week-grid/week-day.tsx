import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { timePointsPerDay } from '../../utils/stateless/time/time-points/time-points-per-day'
import WeekDayEvent from './week-day-event'

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

  return (
    <div className="sx__week-day">
      {calendarEvents.map((event) => (
        <WeekDayEvent
          key={event.id}
          calendarEvent={event}
          timePoints={pointsPerDay}
        />
      ))}
    </div>
  )
}

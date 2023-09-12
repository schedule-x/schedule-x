import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { timePointsPerDay } from '../../utils/stateless/time/time-points/time-points-per-day'
import {
  getEventHeight,
  getEventTop,
} from '../../utils/stateless/events/event-placement'

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
        <div
          className="sx__week-day-event"
          style={{
            top: `${getEventTop(
              event.time,
              $app.config.dayBoundaries,
              pointsPerDay
            )}%`,
            height: `${getEventHeight(
              event.time,
              $app.config.dayBoundaries,
              pointsPerDay
            )}%`,
          }}
          key={event.id}
        >
          {event.title}
        </div>
      ))}
    </div>
  )
}

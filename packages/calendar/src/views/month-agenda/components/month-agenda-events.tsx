import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import MonthAgendaEvent from './month-agenda-event'

type props = {
  events: CalendarEventInternal[]
}

export default function MonthAgendaEvents({ events }: props) {
  return (
    <div className="sx__month-agenda-events">
      {events.map((event) => (
        <MonthAgendaEvent calendarEvent={event} key={event.id} />
      ))}
    </div>
  )
}

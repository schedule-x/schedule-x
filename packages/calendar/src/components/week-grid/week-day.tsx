import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'

type props = {
  calendarEvents: CalendarEventInternal[]
}

export default function WeekDay({ calendarEvents }: props) {
  return <div className="sx__week-day"></div>
}

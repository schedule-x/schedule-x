import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'
import { useEffect } from 'preact/compat'

type props = {
  calendarEvents: CalendarEventInternal[]
}

export default function HeaderEvents({ calendarEvents }: props) {
  useEffect(() => {
    console.log(calendarEvents)
  }, [calendarEvents])

  return <div>calendar events</div>
}

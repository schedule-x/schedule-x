import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import CalendarApp from '@schedule-x/calendar/src/calendar.app'
import { useEffect } from 'react'

export default function ScheduleXCalendar(calendarApp: CalendarApp) {
  const randomId = randomStringId()

  useEffect(() => {
    calendarApp.render(document.getElementById(randomId) as HTMLElement)
  }, [])

  return <div id={randomId} />
}

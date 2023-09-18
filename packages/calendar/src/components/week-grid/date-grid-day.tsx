import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'

type props = {
  calendarEvents: (CalendarEventInternal | 'blocker' | null)[]
}

export default function DateGridDay({ calendarEvents }: props) {
  return (
    <div className="sx__date-grid-day">
      {calendarEvents.map((event, index) => {
        if (event === 'blocker' || event === null) return <div></div>
        return (
          <div key={event.id} style={{ gridRow: index + 1 }}>
            {event.title}
          </div>
        )
      })}
    </div>
  )
}

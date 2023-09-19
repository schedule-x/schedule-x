import { CalendarEventInternal } from '../../utils/stateful/calendar-event/calendar-event.interface'

type props = {
  calendarEvent: CalendarEventInternal
  gridRow: number
}

export default function DateGridEvent({ calendarEvent, gridRow }: props) {
  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  return (
    <div
      className="sx__date-grid-event sx__date-grid-cell"
      style={{
        width: `calc(${calendarEvent._nDaysInGrid! * 100}% - 2px)`,
        gridRow,
        ...eventCSSVariables,
      }}
    >
      {calendarEvent.title}
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DATE_GRID_BLOCKER } from '../types/week'

type props = {
  calendarEvents: {
    [key: number]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
  date: string
  $app: CalendarAppSingleton
}

export default function DateGridResourceDay({
  calendarEvents,
  date,
  $app,
}: props) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if ($app.config.callbacks.onEventClick) {
      const event = Object.values(calendarEvents).find(
        (evt) => evt && evt !== DATE_GRID_BLOCKER
      ) as CalendarEventInternal | undefined
      if (event) {
        $app.config.callbacks.onEventClick(event._getExternalEvent(), e)
      }
    }
  }

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if ($app.config.callbacks.onDoubleClickEvent) {
      const event = Object.values(calendarEvents).find(
        (evt) => evt && evt !== DATE_GRID_BLOCKER
      ) as CalendarEventInternal | undefined
      if (event) {
        $app.config.callbacks.onDoubleClickEvent(event._getExternalEvent(), e)
      }
    }
  }

  return (
    <div className="sx__date-grid-day" data-date-grid-date={date}>
      {Object.values(calendarEvents).map((event, index) => {
        if (event === DATE_GRID_BLOCKER || !event) {
          return (
            <div
              key={index}
              className="sx__date-grid-cell"
              style={{ gridRow: index + 1 }}
            />
          )
        }

        const eventCSSVariables = {
          borderInlineStart: `4px solid var(--sx-color-${event._color})`,
          color: `var(--sx-color-on-${event._color}-container)`,
          backgroundColor: `var(--sx-color-${event._color}-container)`,
        }

        return (
          <div
            key={`${event.id}-${index}`}
            className="sx__date-grid-event"
            style={{
              gridRow: index + 1,
              width: '100%',
              borderInlineStart: eventCSSVariables.borderInlineStart,
              color: eventCSSVariables.color,
              backgroundColor: eventCSSVariables.backgroundColor,
            }}
            onClick={handleClick}
            onDblClick={handleDoubleClick}
            data-event-id={event.id}
          >
            <span className="sx__date-grid-event-text">{event.title}</span>
          </div>
        )
      })}
    </div>
  )
}

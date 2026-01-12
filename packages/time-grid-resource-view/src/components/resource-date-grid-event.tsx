import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'

type props = {
  calendarEvent: CalendarEventInternal
}

export default function ResourceDateGridEvent({ calendarEvent }: props) {
  const $app = useContext(AppContext)

  const eventCSSVariables = {
    borderInlineStart: `4px solid var(--sx-color-${calendarEvent._color})`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    const callback = $app.config.callbacks.onEventClick
    if (callback) {
      callback(calendarEvent._getExternalEvent(), e)
    }
  }

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    const callback = $app.config.callbacks.onDoubleClickEvent
    if (callback) {
      callback(calendarEvent._getExternalEvent(), e)
    }
  }

  const isFullDay =
    calendarEvent._isSingleDayFullDay || calendarEvent._isMultiDayFullDay

  return (
    <div
      data-event-id={calendarEvent.id}
      onClick={handleClick}
      onDblClick={handleDoubleClick}
      className="sx__resource-date-grid-event sx__event"
      tabIndex={0}
      role="button"
      style={{
        backgroundColor: eventCSSVariables.backgroundColor,
        color: eventCSSVariables.color,
        borderInlineStart: eventCSSVariables.borderInlineStart,
      }}
    >
      <div className="sx__resource-date-grid-event__content">
        {!isFullDay && (
          <span className="sx__resource-date-grid-event__time">
            {getTimeStamp(calendarEvent, $app.config.locale.value)}
          </span>
        )}
        <span className="sx__resource-date-grid-event__title">
          {calendarEvent.title}
        </span>
      </div>
    </div>
  )
}

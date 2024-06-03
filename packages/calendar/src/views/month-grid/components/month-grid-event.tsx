import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import useEventInteractions from '../../../utils/stateful/hooks/use-event-interactions'
import { AppContext } from '../../../utils/stateful/app-context'
import { useContext, useEffect } from 'preact/hooks'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { invokeOnEventClickCallback } from '../../../utils/stateless/events/invoke-on-event-click-callback'
import { isUIEventTouchEvent } from '@schedule-x/shared/src/utils/stateless/dom/is-touch-event'

type props = {
  gridRow: number
  calendarEvent: CalendarEventInternal
  date: string
}

export default function MonthGridEvent({
  gridRow,
  calendarEvent,
  date,
}: props) {
  const $app = useContext(AppContext)
  const { createDragStartTimeout, setClickedEventIfNotDragging } =
    useEventInteractions($app)

  const hasStartDate = dateFromDateTime(calendarEvent.start) === date
  const nDays = calendarEvent._eventFragments[date]

  const eventCSSVariables = {
    borderLeft: hasStartDate
      ? `4px solid var(--sx-color-${calendarEvent._color})`
      : undefined,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    // CORRELATION ID: 2 (10px subtracted from width)
    // nDays * 100% for the width of each day + 1px for border - 10 px for horizontal gap between events
    width: `calc(${nDays * 100 + '%'} + ${nDays}px - 10px)`,
  } as const

  const handleStartDrag = (uiEvent: UIEvent) => {
    if (isUIEventTouchEvent(uiEvent)) uiEvent.preventDefault()
    if (!uiEvent.target) return
    if (!$app.config.plugins.dragAndDrop) return

    $app.config.plugins.dragAndDrop.createMonthGridDragHandler(
      calendarEvent,
      $app
    )
  }

  const customComponent = $app.config._customComponentFns.monthGridEvent
  const customComponentId = customComponent
    ? 'custom-month-grid-event-' + randomStringId() // needs a unique string to support event recurrence
    : undefined

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId), {
      calendarEvent: calendarEvent._getExternalEvent(),
      hasStartDate,
    })
  })

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation() // prevent the click from bubbling up to the day element
    invokeOnEventClickCallback($app, calendarEvent)
  }

  return (
    <div
      draggable={!!$app.config.plugins.dragAndDrop}
      data-event-id={calendarEvent.id}
      data-ccid={customComponentId}
      onMouseDown={(e) => createDragStartTimeout(handleStartDrag, e)}
      onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
      onTouchStart={(e) => createDragStartTimeout(handleStartDrag, e)}
      onTouchEnd={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
      onClick={handleOnClick}
      className="sx__event sx__month-grid-event sx__month-grid-cell"
      style={{
        gridRow,
        width: eventCSSVariables.width,
        padding: customComponent ? '0px' : undefined,
        borderLeft: customComponent ? undefined : eventCSSVariables.borderLeft,
        color: customComponent ? undefined : eventCSSVariables.color,
        backgroundColor: customComponent
          ? undefined
          : eventCSSVariables.backgroundColor,
      }}
    >
      {!customComponent && (
        <div className="sx__month-grid-event-title">{calendarEvent.title}</div>
      )}
    </div>
  )
}

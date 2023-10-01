import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { deepCloneEvent } from '../../utils/stateless/events/deep-clone-event'

type props = {
  calendarEvent: CalendarEventInternal
  gridRow: number
}

export default function DateGridEvent({ calendarEvent, gridRow }: props) {
  const $app = useContext(AppContext)

  const [eventCopy, setEventCopy] = useState<CalendarEventInternal>()
  const updateCopy = (newCopy: CalendarEventInternal | undefined) => {
    if (!newCopy) return setEventCopy(undefined)

    setEventCopy(deepCloneEvent(newCopy, $app))
  }

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  const handleMouseDown = (e: MouseEvent) => {
    if (!$app.config.plugins.dragAndDrop) return

    const newEventCopy = deepCloneEvent(calendarEvent, $app)
    setEventCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.createDateGridDragHandler(
      $app,
      e,
      newEventCopy,
      updateCopy
    )
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className="sx__date-grid-event sx__date-grid-cell"
      style={{
        width: `calc(${calendarEvent._nDaysInGrid! * 100}% - 2px)`, // 2px for leaving some space between events
        gridRow,
        ...eventCSSVariables,
      }}
    >
      {calendarEvent.title}
    </div>
  )
}

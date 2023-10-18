import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import useDraggableEvent from '../../../utils/stateful/hooks/use-draggable-event'
import { AppContext } from '../../../utils/stateful/app-context'
import { useContext } from 'preact/compat'

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
  const {
    updateCopy,
    createDragStartTimeout,
    eventCopy,
    setClickedEventIfNotDragging,
  } = useDraggableEvent($app)

  const dateIsEventFirstDate =
    dateFromDateTime(calendarEvent.time.start) === date
  const nDays = calendarEvent._eventFragments[date]

  const eventCSSVariables = {
    borderLeft: dateIsEventFirstDate
      ? `4px solid var(--sx-color-${calendarEvent._color})`
      : undefined,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    gridRow,
    // CORRELATION ID: 2 (10px subtracted from width)
    // nDays * 100% for the width of each day + 1px for border - 10 px for horizontal gap between events
    width: `calc(${nDays * 100 + '%'} + ${nDays}px - 10px)`,
  } as const

  const handleMouseDown = (e: MouseEvent) => {
    // todo: implement drag and drop
  }

  return (
    <div
      onMouseDown={(e) => createDragStartTimeout(handleMouseDown, e)}
      onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
      className="sx__event sx__month-grid-event sx__month-grid-cell"
      style={eventCSSVariables}
    >
      <div className="sx__month-grid-event-title">{calendarEvent.title}</div>
    </div>
  )
}

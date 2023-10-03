import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { deepCloneEvent } from '../../utils/stateless/events/deep-clone-event'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { DateRange } from '../../types/date-range'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import {
  getBorderRadius,
  getWidthToSubtract,
} from '../../utils/stateless/events/date-grid-event-styles'

type props = {
  calendarEvent: CalendarEventInternal
  gridRow: number
  isCopy?: boolean
}

export default function DateGridEvent({
  calendarEvent,
  gridRow,
  isCopy,
}: props) {
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

    $app.config.plugins.dragAndDrop.createDateGridDragHandler({
      event: e,
      eventCopy: newEventCopy,
      updateCopy,
      $app,
    })
  }

  const hasOverflowLeft =
    dateFromDateTime(calendarEvent.time.start) <
    dateFromDateTime(($app.calendarState.range.value as DateRange).start)
  const hasOverflowRight =
    dateFromDateTime(calendarEvent.time.end) >
    dateFromDateTime(($app.calendarState.range.value as DateRange).end)
  const overflowStyles = { backgroundColor: eventCSSVariables.backgroundColor }

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        onMouseDown={handleMouseDown}
        className={
          'sx__date-grid-event sx__date-grid-cell' +
          (isCopy ? ' sx__date-grid-event--copy' : '')
        }
        style={{
          width: `calc(${
            calendarEvent._nDaysInGrid! * 100
          }% - ${getWidthToSubtract(hasOverflowLeft, hasOverflowRight)}px)`,
          gridRow,
          ...eventCSSVariables,
          display: eventCopy ? 'none' : 'flex',
          borderLeft: hasOverflowLeft ? 'none' : eventCSSVariables.borderLeft,
          ...getBorderRadius(hasOverflowLeft, hasOverflowRight),
        }}
      >
        {hasOverflowLeft && (
          <div
            className={'sx__date-grid-event--left-overflow'}
            style={overflowStyles}
          />
        )}

        {calendarEvent.title}

        {hasOverflowRight && (
          <div
            className={'sx__date-grid-event--right-overflow'}
            style={overflowStyles}
          />
        )}
      </div>

      {eventCopy && (
        <DateGridEvent
          calendarEvent={eventCopy}
          gridRow={gridRow}
          isCopy={true}
        />
      )}
    </>
  )
}

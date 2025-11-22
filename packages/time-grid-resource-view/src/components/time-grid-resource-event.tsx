import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useState } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import {
  getEventHeight,
  getInlineStartRule,
  getWidthRule,
  getBorderRule,
} from '../utils/event-styles'
import { timePointToPercentage } from '@schedule-x/shared/src/utils/stateless/time/interpolation/time-point-to-grid-percentage'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

type props = {
  calendarEvent: CalendarEventInternal
  dayBoundariesDateTime: DayBoundariesDateTime
  setMouseDown: (value: boolean) => void
  $app: CalendarAppSingleton
}

export default function TimeGridResourceEvent({
  calendarEvent,
  dayBoundariesDateTime,
  setMouseDown,
  $app,
}: props) {
  const [isDragging, setIsDragging] = useState(false)

  const start = calendarEvent.start as Temporal.ZonedDateTime
  const end = calendarEvent.end as Temporal.ZonedDateTime

  const inlineStart = timePointToPercentage(
    $app.config.timePointsPerDay,
    $app.config.dayBoundaries.value,
    timePointsFromString(timeFromDateTime(start.toString()))
  )

  const height = getEventHeight(
    start,
    end,
    $app.config.dayBoundaries.value,
    $app.config.timePointsPerDay
  )

  const eventWidth = 100 // Full width for now, will be adjusted based on concurrency
  const leftRule = getInlineStartRule(calendarEvent, eventWidth)
  const widthRule = getWidthRule(
    leftRule,
    eventWidth,
    calendarEvent._maxConcurrentEvents,
    $app.config.weekOptions.value.eventOverlap || false
  )
  const borderRule = getBorderRule(calendarEvent)

  const eventCSSVariables = {
    borderInlineStart: `4px solid var(--sx-color-${calendarEvent._color})`,
    textColor: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  const handleMouseDown = (e: MouseEvent) => {
    setMouseDown(true)
    if (
      $app.config.plugins.dragAndDrop &&
      !calendarEvent._options?.disableDND
    ) {
      // Drag and drop will be handled by plugin
    }
  }

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if ($app.config.callbacks.onEventClick) {
      $app.config.callbacks.onEventClick(calendarEvent._getExternalEvent(), e)
    }
  }

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if ($app.config.callbacks.onDoubleClickEvent) {
      $app.config.callbacks.onDoubleClickEvent(
        calendarEvent._getExternalEvent(),
        e
      )
    }
  }

  return (
    <div
      className="sx__time-grid-event"
      style={{
        position: 'absolute',
        top: `${inlineStart}%`,
        height: `${height}%`,
        left: `${leftRule}%`,
        width: `${widthRule}%`,
        borderTop: borderRule,
        borderInlineEnd: borderRule,
        borderBottom: borderRule,
        borderInlineStart: eventCSSVariables.borderInlineStart,
        backgroundColor: eventCSSVariables.backgroundColor,
        color: eventCSSVariables.textColor,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDblClick={handleDoubleClick}
      data-event-id={calendarEvent.id}
    >
      <div className="sx__time-grid-event-content">{calendarEvent.title}</div>
    </div>
  )
}

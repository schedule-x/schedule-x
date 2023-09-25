/* eslint-disable max-lines */
import {
  CalendarEventInternal,
  CalendarEventTime,
} from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import {
  getBorderRule,
  getEventHeight,
  getEventTop,
  getLeftRule,
  getWidthRule,
} from '../../utils/stateless/events/event-styles'
import { useContext, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '../icons/user-icon'
import TimeIcon from '../icons/time-icon'
import { deepCloneEvent } from '../../utils/stateless/events/deep-clone-event'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'

type props = {
  calendarEvent: CalendarEventInternal
  timePoints: number
  dayBoundariesDateTime?: DayBoundariesDateTime
}

export default function TimeGridEvent({
  calendarEvent,
  timePoints,
  dayBoundariesDateTime,
}: props) {
  const $app = useContext(AppContext)

  const [eventCopy, setEventCopy] = useState<CalendarEventInternal>()
  const updateCopy = (newCopy: CalendarEventInternal | undefined) => {
    if (!newCopy) return setEventCopy(undefined)

    setEventCopy(deepCloneEvent(newCopy, $app))
  }

  const localizeArgs = [
    $app.config.locale,
    { hour: 'numeric', minute: 'numeric' },
  ] as const
  const getEventTime = (time: CalendarEventTime) => {
    const localizedStartTime = toJSDate(time.start).toLocaleTimeString(
      ...localizeArgs
    )
    const localizedEndTime = toJSDate(time.end).toLocaleTimeString(
      ...localizeArgs
    )
    return `${localizedStartTime} – ${localizedEndTime}`
  }

  const getEventPeople = (people: string[]) => people.join(', ')

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    textColor: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    iconStroke: `var(--sx-color-on-${calendarEvent._color}-container)`,
  } as const

  const leftRule = getLeftRule(calendarEvent)

  const handleMouseDown = (e: MouseEvent) => {
    console.log('hey')
    if (!dayBoundariesDateTime) return // this can only happen in eventCopy
    if (!e.target) return
    if (!$app.config.plugins.dragAndDrop) return

    const eventCopy = deepCloneEvent(calendarEvent, $app)
    setEventCopy(eventCopy)

    const dragHandler =
      $app.config.plugins.dragAndDrop.createTimeGridDragHandler(
        $app,
        e,
        eventCopy,
        updateCopy,
        dayBoundariesDateTime
      )
  }

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        className={'sx__time-grid-event' + (eventCopy ? ' is-dragging' : '')}
        style={{
          opacity: eventCopy ? 0.5 : 1,
          top: `${getEventTop(
            calendarEvent.time,
            $app.config.dayBoundaries,
            timePoints
          )}%`,
          height: `${getEventHeight(
            calendarEvent.time,
            $app.config.dayBoundaries,
            timePoints
          )}%`,
          left: `${leftRule}%`,
          width: `${getWidthRule(leftRule)}%`,
          backgroundColor: eventCSSVariables.backgroundColor,
          color: eventCSSVariables.textColor,
          border: getBorderRule(calendarEvent),
          borderLeft: eventCSSVariables.borderLeft,
        }}
      >
        {calendarEvent.title && (
          <div className="sx__time-grid-event-title">{calendarEvent.title}</div>
        )}

        <div className="sx__time-grid-event-time">
          <TimeIcon strokeColor={eventCSSVariables.iconStroke} />
          {getEventTime(calendarEvent.time)}
        </div>

        {calendarEvent.people && (
          <div className="sx__time-grid-event-people">
            <UserIcon strokeColor={eventCSSVariables.iconStroke} />
            {getEventPeople(calendarEvent.people)}
          </div>
        )}
      </div>

      {eventCopy && (
        <TimeGridEvent calendarEvent={eventCopy} timePoints={timePoints} />
      )}
    </>
  )
}

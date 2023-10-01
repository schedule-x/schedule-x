import {
  CalendarEventInternal,
  CalendarEventTime,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
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
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'

type props = {
  calendarEvent: CalendarEventInternal
  dayBoundariesDateTime?: DayBoundariesDateTime
  isCopy?: boolean
}

export default function TimeGridEvent({
  calendarEvent,
  dayBoundariesDateTime,
  isCopy,
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
    if (!dayBoundariesDateTime) return // this can only happen in eventCopy
    if (!e.target) return
    if (!$app.config.plugins.dragAndDrop) return

    const newEventCopy = deepCloneEvent(calendarEvent, $app)
    setEventCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.createTimeGridDragHandler(
      $app,
      e,
      newEventCopy,
      updateCopy,
      dayBoundariesDateTime
    )
  }

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        onMouseDown={handleMouseDown}
        className={'sx__time-grid-event' + (isCopy ? ' is-event-copy' : '')}
        style={{
          top: `${getEventTop(
            calendarEvent.time,
            $app.config.dayBoundaries,
            $app.config.timePointsPerDay
          )}%`,
          height: `${getEventHeight(
            calendarEvent.time,
            $app.config.dayBoundaries,
            $app.config.timePointsPerDay
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

      {eventCopy && <TimeGridEvent calendarEvent={eventCopy} isCopy={true} />}
    </>
  )
}

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
import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import useEventInteractions from '../../utils/stateful/hooks/use-event-interactions'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'

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

  const {
    eventCopy,
    updateCopy,
    createDragStartTimeout,
    setClickedEventIfNotDragging,
  } = useEventInteractions($app)

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
    updateCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.createTimeGridDragHandler(
      {
        $app,
        event: e,
        updateCopy,
        eventCopy: newEventCopy,
      },
      dayBoundariesDateTime
    )
  }

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        onMouseDown={(e) => createDragStartTimeout(handleMouseDown, e)}
        onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        className={
          'sx__time-grid-event sx__event' + (isCopy ? ' is-event-copy' : '')
        }
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
            {concatenatePeople(calendarEvent.people)}
          </div>
        )}
      </div>

      {eventCopy && <TimeGridEvent calendarEvent={eventCopy} isCopy={true} />}
    </>
  )
}

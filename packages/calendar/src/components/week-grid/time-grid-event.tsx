import {
  CalendarEventInternal,
  CalendarEventTime,
} from '../../utils/stateful/calendar-event/calendar-event.interface'
import {
  getBorderRule,
  getEventHeight,
  getEventTop,
  getLeftRule,
  getWidthRule,
} from '../../utils/stateless/events/event-styles'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '../icons/user-icon'
import TimeIcon from '../icons/time-icon'

type props = {
  calendarEvent: CalendarEventInternal
  timePoints: number
}

export default function TimeGridEvent({ calendarEvent, timePoints }: props) {
  const $app = useContext(AppContext)

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

  return (
    <>
      <div
        className="sx__week-day-event"
        style={{
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
          <div className="sx__week-day-event-title">{calendarEvent.title}</div>
        )}

        <div className="sx__week-day-event-time">
          <TimeIcon strokeColor={eventCSSVariables.iconStroke} />
          {getEventTime(calendarEvent.time)}
        </div>

        {calendarEvent.people && (
          <div className="sx__week-day-event-people">
            <UserIcon strokeColor={eventCSSVariables.iconStroke} />
            {getEventPeople(calendarEvent.people)}
          </div>
        )}
      </div>
    </>
  )
}

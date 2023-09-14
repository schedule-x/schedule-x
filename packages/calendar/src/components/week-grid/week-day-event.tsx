import {
  CalendarEventInternal,
  CalendarEventTime,
} from '../../utils/stateful/calendar-event/calendar-event.interface'
import {
  getEventHeight,
  getEventTop,
} from '../../utils/stateless/events/event-placement'
import { useContext } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '../icons/user-icon'
import TimeIcon from '../icons/time-icon'

type props = {
  calendarEvent: CalendarEventInternal
  timePoints: number
}

export default function WeekDayEvent({ calendarEvent, timePoints }: props) {
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

  // TODO: get event color from its calendar color
  const eventColor = 'primary'

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${eventColor})`,
    textColor: `var(--sx-color-on-${eventColor}-container)`,
    backgroundColor: `var(--sx-color-${eventColor}-container)`,
    iconStroke: `var(--sx-color-on-${eventColor}-container)`,
  } as const

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
          backgroundColor: eventCSSVariables.backgroundColor,
          color: eventCSSVariables.textColor,
          borderLeft: eventCSSVariables.borderLeft,
        }}
      >
        {calendarEvent.title && (
          <div className="sx__week-day-event-title">{calendarEvent.title}</div>
        )}

        <div className="sx__week-day-event-time">
          <TimeIcon fillColor={eventCSSVariables.iconStroke} />
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

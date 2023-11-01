import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { useContext } from 'preact/compat'
import { AppContext } from '../../../utils/stateful/app-context'

type props = {
  calendarEvent: CalendarEventInternal
}

export default function MonthAgendaEvent({ calendarEvent }: props) {
  const $app = useContext(AppContext)

  const eventCSSVariables = {
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
  }

  return (
    <div className="sx__month-agenda-event" style={eventCSSVariables}>
      <div className="sx__month-agenda-event__title">{calendarEvent.title}</div>

      <div className="sx__month-agenda-event__has-icon">
        <TimeIcon
          strokeColor={`var(--sx-color-on-${calendarEvent._color}-container)`}
        />

        {getTimeStamp(calendarEvent, $app.config.locale)}
      </div>
    </div>
  )
}

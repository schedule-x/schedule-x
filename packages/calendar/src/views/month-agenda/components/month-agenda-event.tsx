import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import useEventInteractions from '../../../utils/stateful/hooks/use-event-interactions'

type props = {
  calendarEvent: CalendarEventInternal
}

export default function MonthAgendaEvent({ calendarEvent }: props) {
  const $app = useContext(AppContext)
  const { setClickedEvent } = useEventInteractions($app)

  const eventCSSVariables = {
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
  }

  return (
    <div
      className="sx__event sx__month-agenda-event"
      style={eventCSSVariables}
      onClick={(e) => setClickedEvent(e, calendarEvent)}
    >
      <div className="sx__month-agenda-event__title">{calendarEvent.title}</div>

      <div className="sx__month-agenda-event__time sx__month-agenda-event__has-icon">
        <TimeIcon
          strokeColor={`var(--sx-color-on-${calendarEvent._color}-container)`}
        />

        {getTimeStamp(calendarEvent, $app.config.locale)}
      </div>
    </div>
  )
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import MonthAgendaEvent from './month-agenda-event'
import { useContext } from 'preact/compat'
import { AppContext } from '../../../utils/stateful/app-context'

type props = {
  events: CalendarEventInternal[]
}

export default function MonthAgendaEvents({ events }: props) {
  const $app = useContext(AppContext)

  return (
    <div className="sx__month-agenda-events">
      {events.length ? (
        events.map((event) => (
          <MonthAgendaEvent calendarEvent={event} key={event.id} />
        ))
      ) : (
        <div className="sx__month-agenda-events__empty">
          {$app.translate('No events')}
        </div>
      )}
    </div>
  )
}

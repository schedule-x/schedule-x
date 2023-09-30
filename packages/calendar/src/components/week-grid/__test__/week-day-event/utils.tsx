import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TimeGridEvent from '../../time-grid-event'

export const factory = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeGridEvent calendarEvent={calendarEvent} />
    </AppContext.Provider>
  )
}

import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TimeGridDay from '../../time-grid-day'

export const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvents: CalendarEventInternal[],
  date: string
) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeGridDay calendarEvents={calendarEvents} date={date} />
    </AppContext.Provider>
  )
}

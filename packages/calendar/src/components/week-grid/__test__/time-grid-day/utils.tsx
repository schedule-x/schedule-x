import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TimeGridDay from '../../time-grid-day'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvents: CalendarEventInternal[],
  date: string,
  backgroundEvents: BackgroundEvent[] = []
) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeGridDay
        calendarEvents={calendarEvents}
        date={date}
        backgroundEvents={backgroundEvents}
      />
    </AppContext.Provider>
  )
}

import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TimeGridEvent from '../../time-grid-event'
import { vi } from 'vitest'

export const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeGridEvent
        calendarEvent={calendarEvent}
        dayBoundariesDateTime={{
          start: '2021-10-10 00:00',
          end: '2021-10-10 23:59',
        }}
        setMouseDown={vi.fn()}
      />
    </AppContext.Provider>
  )
}

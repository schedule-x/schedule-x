import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../../utils/stateful/app-context'
import MonthGridEvent from '../../month-grid-event'

export const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal,
  isFirstWeek = false,
  isLastWeek = false
) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthGridEvent
        calendarEvent={calendarEvent}
        gridRow={0}
        date={'2020-01-01'}
        isFirstWeek={isFirstWeek}
        isLastWeek={isLastWeek}
      />
    </AppContext.Provider>
  )
}

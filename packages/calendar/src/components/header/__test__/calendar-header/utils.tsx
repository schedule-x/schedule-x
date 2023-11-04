import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import CalendarHeader from '../../calendar-header'

export const renderComponent = (app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={app}>
      <CalendarHeader />
    </AppContext.Provider>
  )
}

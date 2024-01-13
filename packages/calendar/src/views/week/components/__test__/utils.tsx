import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import { WeekWrapper } from '../week-wrapper'

export const renderComponent = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <WeekWrapper $app={$app} id={'1'} />
    </AppContext.Provider>
  )
}

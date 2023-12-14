import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import ForwardBackwardNavigation from '../../forward-backward-navigation'

export const renderComponent = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <ForwardBackwardNavigation />
    </AppContext.Provider>
  )
}

export const clickNext = () => {
  screen.getByText('Next').click()
}

export const clickPrevious = () => {
  screen.getByText('Previous').click()
}

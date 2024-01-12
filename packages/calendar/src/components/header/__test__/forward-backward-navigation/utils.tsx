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
  screen.getByText('Next period').click()
}

export const clickPrevious = () => {
  screen.getByText('Previous period').click()
}

export const getLeftChevron = () => {
  return document.querySelectorAll('.sx__chevron-wrapper')[0] as HTMLElement
}

export const getRightChevron = () => {
  return document.querySelectorAll('.sx__chevron-wrapper')[1] as HTMLElement
}

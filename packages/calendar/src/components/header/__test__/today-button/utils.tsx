import { fireEvent, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TodayButton from '../../today-button'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <TodayButton />
    </AppContext.Provider>
  )
}

const createAppSingletonWithSelectedDate = (initialSelectedDate: string) => {
  return __createAppWithViews__({
    datePicker: {
      selectedDate: initialSelectedDate,
    },
  })
}

export const renderWithSelectedDateInThePast = (
  initialSelectedDate: string
) => {
  const $app = createAppSingletonWithSelectedDate(initialSelectedDate)
  renderComponent($app)

  return $app
}

export const renderWithSelectedDateToday = () => {
  const $app = createAppSingletonWithSelectedDate(toDateString(new Date()))
  renderComponent($app)

  return $app
}

export const clickTodayButton = () => {
  const button = screen.queryByText('Today') as HTMLElement
  fireEvent.click(button)
}

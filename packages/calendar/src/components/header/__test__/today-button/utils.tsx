import { fireEvent, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TodayButton from '../../today-button'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import 'temporal-polyfill/global'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <TodayButton />
    </AppContext.Provider>
  )
}

const createAppSingletonWithSelectedDate = (
  initialSelectedDate: Temporal.PlainDate
) => {
  return __createAppWithViews__({
    datePicker: {
      selectedDate: initialSelectedDate,
    },
  })
}

export const renderWithSelectedDateInThePast = (
  initialSelectedDate: Temporal.PlainDate
) => {
  const $app = createAppSingletonWithSelectedDate(initialSelectedDate)
  renderComponent($app)

  return $app
}

export const renderWithSelectedDateToday = () => {
  const now = Temporal.Now.plainDateISO()
  const $app = createAppSingletonWithSelectedDate(Temporal.PlainDate.from(now))
  renderComponent($app)

  return $app
}

export const clickTodayButton = () => {
  const button = screen.queryByText('Today') as HTMLElement
  fireEvent.click(button)
}

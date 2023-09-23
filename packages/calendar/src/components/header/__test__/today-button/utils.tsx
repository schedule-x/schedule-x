import { createCalendarAppSingleton } from '../../../../factory'
import { fireEvent, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import TodayButton from '../../today-button'
import { toDateString } from '../../../../../../shared/src/utils/stateless/time/format-conversion/date-to-strings'
import CalendarAppSingleton from '../../../../utils/stateful/app-singleton/calendar-app-singleton'

const factory = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <TodayButton />
    </AppContext.Provider>
  )
}

const createAppSingletonWithSelectedDate = (initialSelectedDate: string) => {
  return createCalendarAppSingleton({
    datePicker: {
      selectedDate: initialSelectedDate,
    },
  })
}

export const renderWithSelectedDateInThePast = (
  initialSelectedDate: string
) => {
  const $app = createAppSingletonWithSelectedDate(initialSelectedDate)
  factory($app)

  return $app
}

export const renderWithSelectedDateToday = () => {
  const $app = createAppSingletonWithSelectedDate(toDateString(new Date()))
  factory($app)

  return $app
}

export const clickTodayButton = () => {
  const button = screen.queryByText('Today') as HTMLElement
  fireEvent.click(button)
}

import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewWeek from '../../month-view-week'

export const renderComponent = ($app: DatePickerAppSingleton, week: Temporal.ZonedDateTime[]) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthViewWeek week={week} />
    </AppContext.Provider>
  )
}

export const getSelectedDay = (container: Element) => {
  return container.querySelector(
    '.sx__date-picker__day.sx__date-picker__day--selected'
  )
}

export const getToday = (container: Element) => {
  return container.querySelector(
    '.sx__date-picker__day.sx__date-picker__day--today'
  )
}

export const clickByDate = (date: string) => {
  screen.getByText(date).click()
}

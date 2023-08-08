import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewWeek from '../../month-view-week'

export const factory = ($app: DatePickerAppSingleton, week: Date[]) => {
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

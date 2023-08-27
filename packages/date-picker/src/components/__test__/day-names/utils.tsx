import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import DayNames from '../../day-names'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { expect } from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'

export const factory = (app: DatePickerAppSingleton) => {
  render(
    <AppContext.Provider value={app}>
      <DayNames />
    </AppContext.Provider>
  )
}

export const assertDayNames = (dayNames: string[]) => {
  expect(screen.queryAllByTestId('day-name')[0].textContent).toBe(dayNames[0])
  expect(screen.queryAllByTestId('day-name')[1].textContent).toBe(dayNames[1])
  expect(screen.queryAllByTestId('day-name')[2].textContent).toBe(dayNames[2])
  expect(screen.queryAllByTestId('day-name')[3].textContent).toBe(dayNames[3])
  expect(screen.queryAllByTestId('day-name')[4].textContent).toBe(dayNames[4])
  expect(screen.queryAllByTestId('day-name')[5].textContent).toBe(dayNames[5])
  expect(screen.queryAllByTestId('day-name')[6].textContent).toBe(dayNames[6])
}
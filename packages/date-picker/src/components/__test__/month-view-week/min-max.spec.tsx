import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewWeek from '../../month-view-week'
import TimeUnitsBuilder from '../../../../../../shared/utils/stateful/time-units/time-units.builder'
import { Month } from '../../../../../../shared/enums/time/month.enum'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it.each([
    [new Date(2022, Month.DECEMBER, 19), 7, 0],
    [new Date(2022, Month.DECEMBER, 26), 6, 1],
    [new Date(2023, Month.JANUARY, 2), 0, 7],
  ])(
    'should disable all dates before 2023-01-01',
    (
      date: Date,
      expectedDisabledDatesCount: number,
      expectedEnabledDatesCount: number
    ) => {
      const $app = __createDatePickerAppSingleton__(
        undefined,
        undefined,
        '2023-01-01'
      )
      render(
        <AppContext.Provider value={$app}>
          <MonthViewWeek
            week={new TimeUnitsBuilder().build().getWeekFor(date)}
          />
        </AppContext.Provider>
      )

      const disabledButtons = document.querySelectorAll('button:disabled')
      expect(disabledButtons.length).toBe(expectedDisabledDatesCount)
      const enabledButtons = document.querySelectorAll('button:not(:disabled)')
      expect(enabledButtons.length).toBe(expectedEnabledDatesCount)
    }
  )

  it.each([
    [new Date(2022, Month.DECEMBER, 19), 0, 7],
    [new Date(2022, Month.DECEMBER, 26), 1, 6],
    [new Date(2023, Month.JANUARY, 2), 7, 0],
  ])(
    'should disable all dates after 2022-12-31',
    (
      date: Date,
      expectedDisabledDatesCount: number,
      expectedEnabledDatesCount: number
    ) => {
      const $app = __createDatePickerAppSingleton__(
        undefined,
        undefined,
        undefined,
        '2022-12-31'
      )
      render(
        <AppContext.Provider value={$app}>
          <MonthViewWeek
            week={new TimeUnitsBuilder().build().getWeekFor(date)}
          />
        </AppContext.Provider>
      )

      const disabledButtons = document.querySelectorAll('button:disabled')
      expect(disabledButtons.length).toBe(expectedDisabledDatesCount)
      const enabledButtons = document.querySelectorAll('button:not(:disabled)')
      expect(enabledButtons.length).toBe(expectedEnabledDatesCount)
    }
  )
})

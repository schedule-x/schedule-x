import {
  describe,
  it,
  expect,
  beforeEach,
} from '../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import TimeUnitsBuilder from '../../../../../../shared/utils/stateful/time-units/time-units.builder'
import { Month } from '../../../../../../shared/enums/time/month.enum'
import { createAppSingleton } from '../../../factory'
import { factory } from './utils'

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
      const $app = createAppSingleton({ min: '2023-01-01' })
      factory($app, new TimeUnitsBuilder().build().getWeekFor(date))

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
      const $app = createAppSingleton({ max: '2022-12-31' })
      factory($app, new TimeUnitsBuilder().build().getWeekFor(date))

      const disabledButtons = document.querySelectorAll('button:disabled')
      expect(disabledButtons.length).toBe(expectedDisabledDatesCount)
      const enabledButtons = document.querySelectorAll('button:not(:disabled)')
      expect(enabledButtons.length).toBe(expectedEnabledDatesCount)
    }
  )
})

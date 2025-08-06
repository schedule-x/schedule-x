import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { createAppSingleton } from '../../../factory'
import { renderComponent } from './utils'
import { createBaseConfig } from '@schedule-x/calendar/src/__test__/utils'

describe('MonthViewWeek', () => {
  beforeEach(() => {
    cleanup()
  })

  it.each([
    [Temporal.PlainDate.from('2022-12-19'), 7, 0],
    [Temporal.PlainDate.from('2022-12-26'), 6, 1],
    [Temporal.PlainDate.from('2023-01-02'), 0, 7],
  ])(
    'should disable all dates before 2023-01-01',
    (
      date: Temporal.PlainDate,
      expectedDisabledDatesCount: number,
      expectedEnabledDatesCount: number
    ) => {
      const $app = createAppSingleton({ min: Temporal.PlainDate.from('2023-01-01') })
      renderComponent(
        $app,
        new TimeUnitsBuilder()
          .withConfig(createBaseConfig())
          .build()
          .getWeekFor(date)
      )

      const disabledButtons = document.querySelectorAll('button:disabled')
      expect(disabledButtons.length).toBe(expectedDisabledDatesCount)
      const enabledButtons = document.querySelectorAll('button:not(:disabled)')
      expect(enabledButtons.length).toBe(expectedEnabledDatesCount)
    }
  )

  it.each([
    [Temporal.PlainDate.from('2022-12-19'), 0, 7],
    [Temporal.PlainDate.from('2022-12-26'), 1, 6],
    [Temporal.PlainDate.from('2023-01-02'), 7, 0],
  ])(
    'should disable all dates after 2022-12-31',
    (
      date: Temporal.PlainDate,
      expectedDisabledDatesCount: number,
      expectedEnabledDatesCount: number
    ) => {
      const $app = createAppSingleton({ max: Temporal.PlainDate.from('2022-12-31') })
      renderComponent(
        $app,
        new TimeUnitsBuilder()
          .withConfig(createBaseConfig())
          .build()
          .getWeekFor(date)
      )

      const disabledButtons = document.querySelectorAll('button:disabled')
      expect(disabledButtons.length).toBe(expectedDisabledDatesCount)
      const enabledButtons = document.querySelectorAll('button:not(:disabled)')
      expect(enabledButtons.length).toBe(expectedEnabledDatesCount)
    }
  )
})

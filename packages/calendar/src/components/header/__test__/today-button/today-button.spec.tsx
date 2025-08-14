import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import {
  clickTodayButton,
  renderWithSelectedDateInThePast,
  renderWithSelectedDateToday,
} from './utils'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

describe('TodayButton', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Clicking the button', () => {
    it('should set the selected date to today', () => {
      const initialSelectedDate = Temporal.PlainDate.from('1991-07-01')
      const now = Temporal.Now.plainDateISO()
      const expectedSelectedDate = Temporal.PlainDate.from(now)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const $app = renderWithSelectedDateInThePast(
        initialSelectedDate,
        timezone as IANATimezone
      )
      expect($app.datePickerState.selectedDate.value).toEqual(
        initialSelectedDate
      )

      clickTodayButton()

      expect($app.datePickerState.selectedDate.value).toEqual(
        expectedSelectedDate
      )
    })

    it('should not change the selected date if it is already today', () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const $app = renderWithSelectedDateToday(timezone as IANATimezone)
      const now = Temporal.Now.plainDateISO(timezone as IANATimezone)
      expect($app.datePickerState.selectedDate.value).toEqual(
        Temporal.PlainDate.from(now)
      )

      clickTodayButton()

      expect($app.datePickerState.selectedDate.value).toEqual(
        Temporal.PlainDate.from(now)
      )
    })
  })
})

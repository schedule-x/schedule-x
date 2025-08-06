import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import {
  clickTodayButton,
  renderWithSelectedDateInThePast,
  renderWithSelectedDateToday,
} from './utils'

describe('TodayButton', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Clicking the button', () => {
    it('should set the selected date to today', () => {
      const initialSelectedDate = Temporal.PlainDate.from('1991-07-01')
      const now = Temporal.Now.plainDateISO()
      const expectedSelectedDate = Temporal.PlainDate.from(now)
      const $app = renderWithSelectedDateInThePast(initialSelectedDate)
      expect($app.datePickerState.selectedDate.value).toEqual(initialSelectedDate)

      clickTodayButton()

      expect($app.datePickerState.selectedDate.value).toEqual(expectedSelectedDate)
    })

    it('should not change the selected date if it is already today', () => {
      const $app = renderWithSelectedDateToday()
      const now = Temporal.Now.plainDateISO()
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

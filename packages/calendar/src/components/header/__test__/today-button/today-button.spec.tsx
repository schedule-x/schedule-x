import {
  afterEach,
  describe,
  expect,
  it,
} from '../../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { toDateString } from '../../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
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
      const initialSelectedDate = '1991-07-01'
      const expectedSelectedDate = toDateString(new Date())
      const $app = renderWithSelectedDateInThePast(initialSelectedDate)
      expect($app.datePickerState.selectedDate.value).toBe(initialSelectedDate)

      clickTodayButton()

      expect($app.datePickerState.selectedDate.value).toBe(expectedSelectedDate)
    })

    it('should not change the selected date if it is already today', () => {
      const $app = renderWithSelectedDateToday()
      expect($app.datePickerState.selectedDate.value).toBe(
        toDateString(new Date())
      )

      clickTodayButton()

      expect($app.datePickerState.selectedDate.value).toBe(
        toDateString(new Date())
      )
    })
  })
})

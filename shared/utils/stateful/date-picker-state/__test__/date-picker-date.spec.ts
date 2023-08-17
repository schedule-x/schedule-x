import {
  describe,
  expect,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl.ts'
import { createDatePickerState } from '../date-picker-state.impl.ts'
import { __createInternalConfig__ as config } from '../../../stateless/testing/unit/factories/create-internal-config.ts'
import { getCurrentDayDateString } from './utils.ts'

describe('date picker date in date picker state impl', () => {
  it('should set datePickerDate to initial selected date', () => {
    const selectedDate = '2023-01-01'
    const underTest = createDatePickerState(config(), selectedDate)
    expect(underTest.datePickerDate.value).toBe(selectedDate)
  })

  it('should set datePickerDate to current day when no selected date is defined', () => {
    const todayDateString = getCurrentDayDateString()
    const underTest = createDatePickerState(config(), '')

    expect(underTest.datePickerDate.value).toBe(todayDateString)
  })
})

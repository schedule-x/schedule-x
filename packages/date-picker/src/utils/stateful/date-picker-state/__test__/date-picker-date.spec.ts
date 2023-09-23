import { createDatePickerState } from '../date-picker-state.impl'
import { __createInternalConfig__ as config } from '../../../../../../../shared/utils/stateless/testing/unit/factories/create-internal-config'
import { getCurrentDayDateString } from './utils'
import {
  describe,
  it,
  expect,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'

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

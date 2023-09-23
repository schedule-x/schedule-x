import {
  describe,
  it,
  expect,
  mockFn,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerState } from '../date-picker-state.impl'
import { __createInternalConfig__ as config } from '../../../stateless/testing/factories/create-internal-config'
import { getCurrentDayDateString } from './utils'

describe('selected date in date picker state impl', () => {
  const defaultSelectedDate = '2023-01-01'

  it('should set initial selected date', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.selectedDate.value).toBe(defaultSelectedDate)
  })

  it('should set a default selected date when no selected date is defined', () => {
    const underTest = createDatePickerState(config())
    const fullExpectedDate = getCurrentDayDateString()

    expect(underTest.selectedDate.value).toBe(fullExpectedDate)
  })

  it('should set selected date to an empty string', () => {
    const underTest = createDatePickerState(config(), '')
    expect(underTest.selectedDate.value).toBe('')
  })

  it('should call on change listener when selected date changes', () => {
    const onChangeSpy = mockFn()
    const appConfig = {
      ...config(),
      listeners: { onChange: onChangeSpy },
    }
    const underTest = createDatePickerState(appConfig, defaultSelectedDate)
    expect(onChangeSpy).toHaveBeenCalledWith(defaultSelectedDate)

    const newSelectedDate = '2023-01-10'
    underTest.selectedDate.value = newSelectedDate

    expect(onChangeSpy).toHaveBeenCalledWith(newSelectedDate)
  })
})

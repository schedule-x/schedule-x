import {
  describe,
  it,
  expect,
  mockFn,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerState } from '../date-picker-state.impl'
import { __createInternalConfig__ as config } from '../../../stateless/testing/factories/create-internal-config'
import { getCurrentDayDateString } from './utils'
import 'temporal-polyfill/global'

describe('selected date in date picker state impl', () => {
  const defaultSelectedDate = Temporal.PlainDate.from('2023-01-01')

  it('should set initial selected date', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.selectedDate.value).toEqual(defaultSelectedDate)
  })

  it('should set a default selected date when no selected date is defined', () => {
    const underTest = createDatePickerState(config())
    const fullExpectedDate = Temporal.PlainDate.from(getCurrentDayDateString())

    expect(underTest.selectedDate.value).toEqual(fullExpectedDate)
  })

  it('should set selected date to current date when empty string is provided', () => {
    const underTest = createDatePickerState(config(), undefined)
    expect(underTest.selectedDate.value).toEqual(Temporal.PlainDate.from(Temporal.Now.plainDateISO()))
  })

  it('should call on change listener when selected date changes', () => {
    const onChangeSpy = mockFn()
    const appConfig = {
      ...config(),
      listeners: { onChange: onChangeSpy },
    }
    const underTest = createDatePickerState(appConfig, defaultSelectedDate)

    const newSelectedDate = Temporal.PlainDate.from('2023-01-10')
    underTest.selectedDate.value = newSelectedDate

    expect(onChangeSpy).toHaveBeenCalledWith(newSelectedDate)
  })
})

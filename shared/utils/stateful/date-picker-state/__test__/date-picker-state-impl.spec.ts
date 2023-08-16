import {
  describe,
  expect,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl'

import { DatePickerView } from '@schedule-x/date-picker/src/enums/date-picker-view.enum'
import { createDatePickerState } from '../date-picker-state.impl'
import { getCurrentDayDateString } from './utils.ts'
import { __createInternalConfig__ as config } from '../../../stateless/testing/unit/factories/create-internal-config.ts'
import { vi } from 'vitest'

describe('DatePickerStateImpl', () => {
  const defaultSelectedDate = '2023-01-01'

  it('should set isOpen to true', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)

    underTest.open()

    expect(underTest.isOpen.value).toBe(true)
  })

  it('should set isOpen to false', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    underTest.open()
    expect(underTest.isOpen.value).toBe(true)

    underTest.close()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should toggle isOpen', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.isOpen.value).toBe(false)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(true)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should set selected date', () => {
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

  it('should set datePickerDate to initial selected date', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.datePickerDate.value).toBe(defaultSelectedDate)
  })

  it('should set datePickerDate to current day when no selected date is defined', () => {
    const todayDateString = getCurrentDayDateString()
    const underTest = createDatePickerState(config(), '')

    expect(underTest.datePickerDate.value).toBe(todayDateString)
  })

  it('should set month-days view as default', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)
  })

  it('should set view', () => {
    const underTest = createDatePickerState(config(), defaultSelectedDate)
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)

    underTest.setView(DatePickerView.YEARS)

    expect(underTest.datePickerView.value).toBe(DatePickerView.YEARS)
  })

  it('should call on change listener when selected date changes', () => {
    const onChangeSpy = vi.fn()
    const appConfig = {
      ...config(),
      listeners: { onChange: onChangeSpy },
    }
    const underTest = createDatePickerState(appConfig, defaultSelectedDate)

    underTest.selectedDate.value = '2023-01-02'

    expect(onChangeSpy).toHaveBeenCalledWith('2023-01-02')
  })
})

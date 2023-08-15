import {
  describe,
  expect,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl'

import { DatePickerView } from '@schedule-x/date-picker/src/enums/date-picker-view.enum'
import { createDatePickerState } from '../date-picker-state.impl'
import { doubleDigit } from '../../../stateless/time/date-time-mutation/date-time-mutation.ts'
import { DEFAULT_LOCALE } from '../../../../values'

describe('DatePickerStateImpl', () => {
  const defaultSelectedDate = '2023-01-01'

  it('should set isOpen to true', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)

    underTest.open()

    expect(underTest.isOpen.value).toBe(true)
  })

  it('should set isOpen to false', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    underTest.open()
    expect(underTest.isOpen.value).toBe(true)

    underTest.close()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should toggle isOpen', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    expect(underTest.isOpen.value).toBe(false)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(true)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should set selected date', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    expect(underTest.selectedDate.value).toBe(defaultSelectedDate)
  })

  it('should set a default selected date when no selected date is defined', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE)
    const today = new Date()
    const expectedYear = today.getFullYear()
    const expectedMonth = today.getMonth() + 1
    const expectedDate = today.getDate()
    const fullExpectedDate = `${expectedYear}-${
      expectedMonth < 10 ? '0' + expectedMonth : expectedMonth
    }-${expectedDate < 10 ? '0' + expectedDate : expectedDate}`

    expect(underTest.selectedDate.value).toBe(fullExpectedDate)
  })

  it('should set selected date to an empty string', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, '')
    expect(underTest.selectedDate.value).toBe('')
  })

  it('should set datePickerDate to initial selected date', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    expect(underTest.datePickerDate.value).toBe(defaultSelectedDate)
  })

  it('should set datePickerDate to current day when no selected date is defined', () => {
    const today = new Date()
    const expectedYear = today.getFullYear()
    const expectedMonth = today.getMonth() + 1
    const expectedDate = today.getDate()
    const todayDateString = `${expectedYear}-${doubleDigit(
      expectedMonth
    )}-${doubleDigit(expectedDate)}`
    const underTest = createDatePickerState(DEFAULT_LOCALE, '')

    expect(underTest.datePickerDate.value).toBe(todayDateString)
  })

  it('should set month-days view as default', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)
  })

  it('should set view', () => {
    const underTest = createDatePickerState(DEFAULT_LOCALE, defaultSelectedDate)
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)

    underTest.setView(DatePickerView.YEARS)

    expect(underTest.datePickerView.value).toBe(DatePickerView.YEARS)
  })
})

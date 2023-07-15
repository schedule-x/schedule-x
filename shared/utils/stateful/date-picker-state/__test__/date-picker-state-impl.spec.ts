import {
  describe,
  expect,
  it,
} from '../../../stateless/testing/unit/unit-testing-library.impl.ts'
import DatePickerStateBuilder from '../date-picker-state.builder'
import DatePickerStateImpl from '../date-picker-state.impl'

describe('DatePickerStateImpl', () => {
  const defaultSelectedDate = '2023-01-01'

  it('should create an instance of DatePickerStateImpl', () => {
    const underTest = new DatePickerStateBuilder(defaultSelectedDate).build()
    expect(underTest).toBeInstanceOf(DatePickerStateImpl)
  })

  it('should set isOpen to true', () => {
    const underTest = new DatePickerStateBuilder(defaultSelectedDate).build()

    underTest.open()

    expect(underTest.isOpen).toBe(true)
  })

  it('should set isOpen to false', () => {
    const underTest = new DatePickerStateBuilder(defaultSelectedDate).build()
    underTest.open()
    expect(underTest.isOpen).toBe(true)

    underTest.close()

    expect(underTest.isOpen).toBe(false)
  })

  it('should toggle isOpen', () => {
    const underTest = new DatePickerStateBuilder(defaultSelectedDate).build()
    expect(underTest.isOpen).toBe(false)

    underTest.toggle()

    expect(underTest.isOpen).toBe(true)

    underTest.toggle()

    expect(underTest.isOpen).toBe(false)
  })

  it('should set selected date', () => {
    const underTest = new DatePickerStateBuilder(defaultSelectedDate).build()
    expect(underTest.selectedDate).toBe(defaultSelectedDate)
  })

  it('should set a default selected date', () => {
    const underTest = new DatePickerStateBuilder().build()
    const today = new Date()
    const expectedYear = today.getFullYear()
    const expectedMonth = today.getMonth()
    const expectedDate = today.getDate()
    const fullExpectedDate = `${expectedYear}-${
      expectedMonth < 10 ? '0' + expectedMonth : expectedMonth
    }-${expectedDate < 10 ? '0' + expectedDate : expectedDate}`

    expect(underTest.selectedDate).toBe(fullExpectedDate)
  })
})

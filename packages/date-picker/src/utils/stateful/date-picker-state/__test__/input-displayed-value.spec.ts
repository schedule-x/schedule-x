import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerState } from '../date-picker-state.impl'
import { __createInternalConfig__ as config } from '../../../stateless/testing/factories/create-internal-config'
import 'temporal-polyfill/global'

describe('date picker state impl - input displayed value', () => {
  it('should default to the value of selected date param if given', () => {
    const expectedResult = Temporal.PlainDate.from('2000-01-01')
    const underTest = createDatePickerState(config(), expectedResult)
    expect(underTest.inputDisplayedValue.value).toBe('1/1/2000')
  })

  it('should default to current date if no selected date param is given', () => {
    const underTest = createDatePickerState(config())
    const now = Temporal.Now.plainDateISO()
    expect(underTest.inputDisplayedValue.value).toBe(
      `${now.month}/${now.day}/${now.year}`
    )
  })

  it.each([
    ['en-US', '2021-01-01', Temporal.PlainDate.from('2021-01-01')],
    ['en-US', '03/20/2025', Temporal.PlainDate.from('2025-03-20')],
    ['en-US', '03/20/202', false],
    ['de-DE', '01.01.2021', Temporal.PlainDate.from('2021-01-01')],
    ['de-DE', '20.03.2025', Temporal.PlainDate.from('2025-03-20')],
    ['de-DE', '20.03.', false],
  ])(
    'should update selected date and date picker date when input displayed value changes',
    (
      locale: string,
      inputDisplayedValue: string,
      expectedNewSelectedDate: Temporal.PlainDate | boolean
    ) => {
      const selectedDateParam = Temporal.PlainDate.from(
        Temporal.Now.plainDateISO()
      )
      const underTest = createDatePickerState(config(locale))
      underTest.handleInput(inputDisplayedValue)

      if (expectedNewSelectedDate) {
        expect(underTest.selectedDate.value).toEqual(expectedNewSelectedDate)
        expect(underTest.datePickerDate.value).toEqual(expectedNewSelectedDate)
      } else {
        expect(underTest.selectedDate.value).toEqual(selectedDateParam)
      }
    }
  )
})

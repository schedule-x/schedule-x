import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { DatePickerView } from '../../../../enums/date-picker-view.enum'
import { createDatePickerState } from '../date-picker-state.impl'
import { __createInternalConfig__ as config } from '../../../stateless/testing/factories/create-internal-config'

describe('DatePickerStateImpl', () => {
  it('should set isOpen to true', () => {
    const underTest = createDatePickerState(config())

    underTest.open()

    expect(underTest.isOpen.value).toBe(true)
  })

  it('should set isOpen to false', () => {
    const underTest = createDatePickerState(config())
    underTest.open()
    expect(underTest.isOpen.value).toBe(true)

    underTest.close()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should toggle isOpen', () => {
    const underTest = createDatePickerState(config())
    expect(underTest.isOpen.value).toBe(false)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(true)

    underTest.toggle()

    expect(underTest.isOpen.value).toBe(false)
  })

  it('should set month-days view as default', () => {
    const underTest = createDatePickerState(config())
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)
  })

  it('should set view', () => {
    const underTest = createDatePickerState(config())
    expect(underTest.datePickerView.value).toBe(DatePickerView.MONTH_DAYS)

    underTest.setView(DatePickerView.YEARS)

    expect(underTest.datePickerView.value).toBe(DatePickerView.YEARS)
  })
})

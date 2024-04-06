import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { createTimePicker } from '../factory'
import TimePickerApp from '../time-picker.app'

describe('TimePickerApp', () => {
  let timePickerApp: TimePickerApp

  beforeEach(() => {
    timePickerApp = createTimePicker({
      initialValue: '12:00',
    })
  })

  it('should use the getter for the value', () => {
    expect(timePickerApp.value).toBe('12:00')
  })

  it('should use the setter for the value', () => {
    timePickerApp.value = '13:00'

    expect(timePickerApp.value).toBe('13:00')
  })
})

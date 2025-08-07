import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createDatePickerState } from '../date-picker-state.impl'
import { stubInterface } from 'ts-sinon'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import { signal } from '@preact/signals'
import 'temporal-polyfill/global'

describe('Date-picker state', () => {
  describe('Validating the input according to min config option', () => {
    it('should not change the input value if it is less than the min date', () => {
      const config = stubInterface<DatePickerConfigInternal>()
      config.locale = signal('en-US')
      config.min = Temporal.PlainDate.from('2021-01-01')
      config.max = Temporal.PlainDate.from('2100-12-31')
      const originalSelectedDate = Temporal.PlainDate.from('2021-12-20')
      const state = createDatePickerState(config, originalSelectedDate)

      state.handleInput('2020-12-31') // less than min

      expect(state.inputDisplayedValue.value).toBe('12/20/2021')
    })

    it('should change the input value if it is greater than the min date', () => {
      const config = stubInterface<DatePickerConfigInternal>()
      config.locale = signal('en-US')
      config.min = Temporal.PlainDate.from('2021-01-01')
      config.max = Temporal.PlainDate.from('2100-12-31')
      const state = createDatePickerState(
        config,
        Temporal.PlainDate.from('2021-12-31')
      )

      state.handleInput('2022-01-01') // greater than min

      expect(state.inputDisplayedValue.value).toBe('1/1/2022')
    })
  })

  describe('Validating the input according to max config option', () => {
    it('should not change the input value if it is greater than the max date', () => {
      const config = stubInterface<DatePickerConfigInternal>()
      config.locale = signal('en-US')
      config.min = Temporal.PlainDate.from('2000-01-01')
      config.max = Temporal.PlainDate.from('2021-12-31')
      const originalSelectedDate = Temporal.PlainDate.from('2021-12-20')
      const state = createDatePickerState(config, originalSelectedDate)

      state.handleInput('2022-01-01')

      expect(state.inputDisplayedValue.value).toBe('12/20/2021')
    })

    it('should change the input value if it is less than the max date', () => {
      const config = stubInterface<DatePickerConfigInternal>()
      config.locale = signal('en-US')
      config.min = Temporal.PlainDate.from('2000-01-01')
      config.max = Temporal.PlainDate.from('2021-12-31')
      const state = createDatePickerState(
        config,
        Temporal.PlainDate.from('2021-12-31')
      )

      state.handleInput('2021-01-01')

      expect(state.inputDisplayedValue.value).toBe('1/1/2021')
    })
  })
})

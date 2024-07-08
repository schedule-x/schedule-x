import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createTimePickerAppContext } from '../factory'

describe('TimePickerFactory', () => {
  describe('time picker state', () => {
    it.each([
      { currentTime: '00:00', is12HourClock: false, expected: '00:00' },
      { currentTime: '00:00', is12HourClock: true, expected: '12:00 AM' },
      { currentTime: '01:00', is12HourClock: false, expected: '01:00' },
      { currentTime: '01:00', is12HourClock: true, expected: '1:00 AM' },
      { currentTime: '11:00', is12HourClock: false, expected: '11:00' },
      { currentTime: '11:00', is12HourClock: true, expected: '11:00 AM' },
      { currentTime: '12:00', is12HourClock: false, expected: '12:00' },
      { currentTime: '12:00', is12HourClock: true, expected: '12:00 PM' },
      { currentTime: '13:00', is12HourClock: false, expected: '13:00' },
      { currentTime: '13:00', is12HourClock: true, expected: '1:00 PM' },
      { currentTime: '23:59', is12HourClock: false, expected: '23:59' },
      { currentTime: '23:59', is12HourClock: true, expected: '11:59 PM' },
    ])(
      'should calculate current displayed time',
      ({ currentTime, is12HourClock, expected }) => {
        const timePickerAppContext = createTimePickerAppContext({
          is12Hour: is12HourClock,
        })
        const underTest = timePickerAppContext.timePickerState
        underTest.currentTime.value = currentTime

        expect(underTest.currentTimeDisplayedValue.value).toBe(expected)
      }
    )

    it('should set default config value for dark mode', () => {
      const timePickerAppContext = createTimePickerAppContext()
      const underTest = timePickerAppContext.config.dark.value

      expect(underTest).toBe(false)
    })

    it('should set default config value for placement', () => {
      const timePickerAppContext = createTimePickerAppContext()
      const underTest = timePickerAppContext.config.placement.value

      expect(underTest).toBe('bottom-start')
    })

    it('should set default config value for teleportTo', () => {
      const timePickerAppContext = createTimePickerAppContext()
      const underTest = timePickerAppContext.config.teleportTo.value

      expect(underTest).toBe(null)
    })

    it('should set default config value for label', () => {
      const timePickerAppContext = createTimePickerAppContext()
      const underTest = timePickerAppContext.config.label.value

      expect(underTest).toBe(null)
    })

    it('should set default config value for is12Hour', () => {
      const timePickerAppContext = createTimePickerAppContext()
      const underTest = timePickerAppContext.config.is12Hour.value

      expect(underTest).toBe(false)
    })
  })
})

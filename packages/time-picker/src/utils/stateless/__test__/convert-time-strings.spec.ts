import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { stubInterface } from 'ts-sinon'
import { TimePickerAppContext } from '../../../types/time-picker-app.context'
import { TimePickerState } from '../../../types/time-picker-state'
import { convert12HourTo24HourTimeString } from '../convert-time-strings'

describe('converting time strings', () => {
  describe('convert12HourTo24HourTimeString', () => {
    it.each([
      { hours: '12', minutes: '00', isAM: true, expected: '00:00' },
      { hours: '12', minutes: '00', isAM: false, expected: '12:00' },
      { hours: '01', minutes: '45', isAM: true, expected: '01:45' },
      { hours: '01', minutes: '45', isAM: false, expected: '13:45' },
      { hours: '11', minutes: '59', isAM: true, expected: '11:59' },
      { hours: '11', minutes: '59', isAM: false, expected: '23:59' },
    ])(
      'should convert $hours:$minutes to $expected',
      ({ hours, minutes, isAM, expected }) => {
        const $app = stubInterface<TimePickerAppContext>()
        $app.timePickerState = stubInterface<TimePickerState>()
        $app.timePickerState.isAM.value = isAM
        $app.timePickerState.currentTime.value = `${hours}:${minutes}`

        convert12HourTo24HourTimeString(hours, minutes, $app)

        expect($app.timePickerState.currentTime.value).toBe(expected)
      }
    )
  })
})

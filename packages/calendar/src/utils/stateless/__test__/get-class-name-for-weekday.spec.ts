import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getClassNameForWeekday } from '../get-class-name-for-weekday'

describe('getClassNameForWeekday', () => {
  it.each([
    [0, 'sx__sunday'],
    [1, 'sx__monday'],
    [2, 'sx__tuesday'],
    [3, 'sx__wednesday'],
    [4, 'sx__thursday'],
    [5, 'sx__friday'],
    [6, 'sx__saturday'],
  ])(`should return 'weekday-%s' for %s`, (weekday, expectedClass) => {
    expect(getClassNameForWeekday(weekday)).toBe(expectedClass)
  })
})

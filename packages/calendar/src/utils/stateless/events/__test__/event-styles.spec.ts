import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getWidthRule } from '../event-styles'

describe('Event styles', () => {
  describe('getting the event width', () => {
    it.each([
      [0, 100, 100],
      [0, 90, 90],
      [50, 100, 50],
      [50, 90, 40],
    ])(
      'should return the correct width',
      (leftRule, eventWidth, expectedWidth) => {
        expect(getWidthRule(leftRule, eventWidth)).toBe(expectedWidth)
      }
    )
  })
})

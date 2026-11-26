import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { RRule } from '../rrule'
import { date } from '../../__test__/test-utils'

describe('RRule', () => {
  describe('constructor', () => {
    it('should throw an error if freq is not provided', () => {
      expect(() => {
        new RRule(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          { dtstart: date('2021-01-01'), freq: 'INVALID' },
          date('2021-01-01')
        ).getRecurrences()
      }).toThrowError('freq is required')
    })
  })
})

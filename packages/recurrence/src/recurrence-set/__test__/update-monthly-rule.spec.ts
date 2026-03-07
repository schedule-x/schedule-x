import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime } from '../../__test__/test-utils'

describe('Updating a recurrence set with a monthly rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 12 days forward', () => {
      const initialValues = {
        rrule: 'FREQ=MONTHLY;BYMONTHDAY=10;COUNT=5',
        dtstart: date('2024-02-10'),
        dtend: date('2024-02-10'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-02-22'), date('2024-02-22'))

      expect(rset.getRrule()).toEqual('FREQ=MONTHLY;COUNT=5;BYMONTHDAY=22')
      expect(rset.getDtstart()).toEqual(date('2024-02-22'))
      expect(rset.getDtend()).toEqual(date('2024-02-22'))
    })
  })

  describe('Based on a datetime string', () => {
    it('should handle moving 1 day and 1 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=MONTHLY;BYMONTHDAY=10;COUNT=5',
        dtstart: datetime('2024-02-10 04:00'),
        dtend: datetime('2024-02-10 05:00'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(
        datetime('2024-02-09 03:00'),
        datetime('2024-02-09 04:00')
      )

      expect(rset.getRrule()).toEqual('FREQ=MONTHLY;COUNT=5;BYMONTHDAY=9')
      expect(rset.getDtstart()).toEqual(datetime('2024-02-09 03:00'))
      expect(rset.getDtend()).toEqual(datetime('2024-02-09 04:00'))
    })
  })
})

import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Updating a recurrence set with a monthly rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 12 days forward', () => {
      const initialValues = {
        rrule: 'FREQ=MONTHLY;BYMONTHDAY=10;COUNT=5',
        dtstart: '20240210',
        dtend: '20240210',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240222')

      expect(rset.getRrule()).toEqual('FREQ=MONTHLY;COUNT=5;BYMONTHDAY=22')
      expect(rset.getDtstart()).toEqual('20240222')
      expect(rset.getDtend()).toEqual('20240222')
    })
  })

  describe('Based on a datetime string', () => {
    it('should handle moving 1 day and 1 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=MONTHLY;BYMONTHDAY=10;COUNT=5',
        dtstart: '20240210T040000',
        dtend: '20240210T050000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240209T030000')

      expect(rset.getRrule()).toEqual('FREQ=MONTHLY;COUNT=5;BYMONTHDAY=9')
      expect(rset.getDtstart()).toEqual('20240209T030000')
      expect(rset.getDtend()).toEqual('20240209T040000')
    })
  })
})

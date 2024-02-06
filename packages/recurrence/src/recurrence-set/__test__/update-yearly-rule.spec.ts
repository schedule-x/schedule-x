import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Updating a recurrence set with a yearly rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 5 days forward with COUNT', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;COUNT=3',
        dtstart: '20240210',
        dtend: '20240210',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240215')

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;COUNT=3')
      expect(rset.getDtstart()).toEqual('20240215')
      expect(rset.getDtend()).toEqual('20240215')
    })

    it('should handle moving 5 days forward with UNTIL', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;UNTIL=20290210',
        dtstart: '20240210',
        dtend: '20240210',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240215')

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;UNTIL=20290215')
      expect(rset.getDtstart()).toEqual('20240215')
      expect(rset.getDtend()).toEqual('20240215')
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;UNTIL=20290210T050000',
        dtstart: '20240210T040000',
        dtend: '20240210T050000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240210T020000')

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;UNTIL=20290210T030000')
      expect(rset.getDtstart()).toEqual('20240210T020000')
      expect(rset.getDtend()).toEqual('20240210T030000')
    })
  })
})

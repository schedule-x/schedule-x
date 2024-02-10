import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe.only('Updating a recurrence set with a daily rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 3 days forward', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA',
        dtstart: '20240210',
        dtend: '20240210',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240213')

      expect(rset.getRrule()).toEqual('FREQ=DAILY;BYDAY=TU')
      expect(rset.getDtstart()).toEqual('20240213')
      expect(rset.getDtend()).toEqual('20240213')
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA',
        dtstart: '20240210T040000',
        dtend: '20240210T050000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240210T020000')

      expect(rset.getRrule()).toEqual('FREQ=DAILY;BYDAY=SA')
      expect(rset.getDtstart()).toEqual('20240210T020000')
      expect(rset.getDtend()).toEqual('20240210T030000')
    })

    it('should move 3 hours backwards into previous day', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA',
        dtstart: '20240210T003000',
        dtend: '20240210T013000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240209T213000')

      expect(rset.getRrule()).toEqual('FREQ=DAILY;BYDAY=FR')
      expect(rset.getDtstart()).toEqual('20240209T213000')
      expect(rset.getDtend()).toEqual('20240209T223000')
    })
  })
})

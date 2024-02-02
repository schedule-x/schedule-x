import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Updating a recurrence set', () => {
  describe('Based on a date string', () => {
    it('should handle moving one day forward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        dtstart: '20240101',
        dtend: '20240101',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240102')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=TU')
      expect(rset.getDtstart()).toEqual('20240102')
      expect(rset.getDtend()).toEqual('20240102')
    })

    it('should handle moving 8 days backward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240509',
        dtstart: '20240115',
        dtend: '20240115',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240107')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;UNTIL=20240501;BYDAY=SU')
      expect(rset.getDtstart()).toEqual('20240107')
      expect(rset.getDtend()).toEqual('20240107')
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours forward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        dtstart: '20240101T010000',
        dtend: '20240101T020000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240101T030000')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=MO')
      expect(rset.getDtstart()).toEqual('20240101T030000')
      expect(rset.getDtend()).toEqual('20240101T040000')
    })

    it('should move 1 days and 2 hours backward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=FR',
        dtstart: '20240202T010000',
        dtend: '20240202T030000',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('20240131T230000')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=WE')
      expect(rset.getDtstart()).toEqual('20240131T230000')
      expect(rset.getDtend()).toEqual('20240201T010000')
    })
  })
})

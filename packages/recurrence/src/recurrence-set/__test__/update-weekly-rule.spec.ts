import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime } from '../../__test__/test-utils'

describe('Updating a recurrence set', () => {
  describe('Based on a date string', () => {
    it('should handle moving one day forward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        dtstart: date('2024-01-01'),
        dtend: date('2024-01-01'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-01-02'), date('2024-01-02'))

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=TU')
      expect(rset.getDtstart()).toEqual(date('2024-01-02'))
      expect(rset.getDtend()).toEqual(date('2024-01-02'))
    })

    it('should handle moving 8 days backward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20240509',
        dtstart: date('2024-01-15'),
        dtend: date('2024-01-15'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-01-07'), date('2024-01-07'))

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;UNTIL=20240501;BYDAY=SU')
      expect(rset.getDtstart()).toEqual(date('2024-01-07'))
      expect(rset.getDtend()).toEqual(date('2024-01-07'))
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours forward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        dtstart: datetime('2024-01-01 01:00'),
        dtend: datetime('2024-01-01 02:00'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(
        datetime('2024-01-01 03:00'),
        datetime('2024-01-01 04:00')
      )

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=MO')
      expect(rset.getDtstart()).toEqual(datetime('2024-01-01 03:00'))
      expect(rset.getDtend()).toEqual(datetime('2024-01-01 04:00'))
    })

    it('should move 1 days and 2 hours backward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=FR',
        dtstart: datetime('2024-02-02 01:00'),
        dtend: datetime('2024-02-02 03:00'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(
        datetime('2024-01-31 23:00'),
        datetime('2024-02-01 01:00')
      )

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=WE')
      expect(rset.getDtstart()).toEqual(datetime('2024-01-31 23:00'))
      expect(rset.getDtend()).toEqual(datetime('2024-02-01 01:00'))
    })
  })
})

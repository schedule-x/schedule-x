import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime } from '../../__test__/test-utils'

describe('Updating a recurrence set with a daily rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 3 days forward', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA;UNTIL=20240220',
        dtstart: date('2024-02-10'),
        dtend: date('2024-02-10'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-02-13'), date('2024-02-13'))

      expect(rset.getRrule()).toEqual('FREQ=DAILY;UNTIL=20240223;BYDAY=TU')
      expect(rset.getDtstart()).toEqual(date('2024-02-13'))
      expect(rset.getDtend()).toEqual(date('2024-02-13'))
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA;UNTIL=20240220T050000',
        dtstart: datetime('2024-02-10 04:00'),
        dtend: datetime('2024-02-10 05:00'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(
        datetime('2024-02-10 02:00'),
        datetime('2024-02-10 03:00')
      )

      expect(rset.getRrule()).toEqual(
        'FREQ=DAILY;UNTIL=20240220T030000;BYDAY=SA'
      )
      expect(rset.getDtstart()).toEqual(datetime('2024-02-10 02:00'))
      expect(rset.getDtend()).toEqual(datetime('2024-02-10 03:00'))
    })

    it('should move 3 hours backwards into previous day', () => {
      const initialValues = {
        rrule: 'FREQ=DAILY;BYDAY=SA;UNTIL=20240220T050000',
        dtstart: datetime('2024-02-10 00:30'),
        dtend: datetime('2024-02-10 01:30'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(
        datetime('2024-02-09 21:30'),
        datetime('2024-02-09 22:30')
      )

      expect(rset.getRrule()).toEqual(
        'FREQ=DAILY;UNTIL=20240220T020000;BYDAY=FR'
      )
      expect(rset.getDtstart()).toEqual(datetime('2024-02-09 21:30'))
      expect(rset.getDtend()).toEqual(datetime('2024-02-09 22:30'))
    })
  })
})

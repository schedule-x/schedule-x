import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime } from '../../__test__/test-utils'

describe('Updating a recurrence set with a yearly rule', () => {
  describe('Based on a date string', () => {
    it('should handle moving 5 days forward with COUNT', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;COUNT=3',
        dtstart: date('2024-02-10'),
        dtend: date('2024-02-10'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-02-15'), date('2024-02-15'))

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;COUNT=3')
      expect(rset.getDtstart()).toEqual(date('2024-02-15'))
      expect(rset.getDtend()).toEqual(date('2024-02-15'))
    })

    it('should handle moving 5 days forward with UNTIL', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;UNTIL=20290210',
        dtstart: date('2024-02-10'),
        dtend: date('2024-02-10'),
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtstart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstartAndDtend(date('2024-02-15'), date('2024-02-15'))

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;UNTIL=20290215')
      expect(rset.getDtstart()).toEqual(date('2024-02-15'))
      expect(rset.getDtend()).toEqual(date('2024-02-15'))
    })
  })

  describe('Based on a datetime string', () => {
    it('should move 2 hours backwards', () => {
      const initialValues = {
        rrule: 'FREQ=YEARLY;UNTIL=20290210T050000',
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

      expect(rset.getRrule()).toEqual('FREQ=YEARLY;UNTIL=20290210T030000')
      expect(rset.getDtstart()).toEqual(datetime('2024-02-10 02:00'))
      expect(rset.getDtend()).toEqual(datetime('2024-02-10 03:00'))
    })
  })
})

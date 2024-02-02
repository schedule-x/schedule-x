import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Updating a recurrence set', () => {
  describe('Updating the rrule', () => {
    it('should handle moving one day forward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        dtstart: '2024-01-01',
        dtend: '2024-01-01',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('2024-01-02')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;BYDAY=TU')
      expect(rset.getDtstart()).toEqual('2024-01-02')
      expect(rset.getDtend()).toEqual('2024-01-02')
    })

    it('should handle moving 8 days backward', () => {
      const initialValues = {
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=2024-05-09',
        dtstart: '2024-01-15',
        dtend: '2024-01-15',
      }

      const rset = new RecurrenceSet({
        rrule: initialValues.rrule,
        dtsart: initialValues.dtstart,
        dtend: initialValues.dtend,
      })
      rset.updateDtstart('2024-01-07')

      expect(rset.getRrule()).toEqual('FREQ=WEEKLY;UNTIL=2024-05-01;BYDAY=SU')
      expect(rset.getDtstart()).toEqual('2024-01-07')
      expect(rset.getDtend()).toEqual('2024-01-07')
    })
  })
})

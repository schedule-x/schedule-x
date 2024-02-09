import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Getting yearly recurrences', () => {
  describe('Using FREQ and COUNT', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;COUNT=6',
        dtstart: '20240202T063000',
        dtend: '20240202T080000',
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        {
          start: '2024-02-02 06:30',
          end: '2024-02-02 08:00',
        },
        {
          start: '2025-02-02 06:30',
          end: '2025-02-02 08:00',
        },
        {
          start: '2026-02-02 06:30',
          end: '2026-02-02 08:00',
        },
        {
          start: '2027-02-02 06:30',
          end: '2027-02-02 08:00',
        },
        {
          start: '2028-02-02 06:30',
          end: '2028-02-02 08:00',
        },
        {
          start: '2029-02-02 06:30',
          end: '2029-02-02 08:00',
        },
      ])
    })
  })

  describe('Using FREQ, UNTIL and INTERVAL', () => {
    it('should get every second year for 6 years, starting 2024-08-02 04:47 - 2024-08-02 04:52', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=YEARLY;UNTIL=20300802T045200;INTERVAL=2',
        dtstart: '20240802T044700',
        dtend: '20240802T045200',
      })

      const recurrences = rset.getRecurrences()

      const expectedRecurrences = [
        {
          start: '2024-08-02 04:47',
          end: '2024-08-02 04:52',
        },
        {
          start: '2026-08-02 04:47',
          end: '2026-08-02 04:52',
        },
        {
          start: '2028-08-02 04:47',
          end: '2028-08-02 04:52',
        },
        {
          start: '2030-08-02 04:47',
          end: '2030-08-02 04:52',
        },
      ]
      expect(recurrences).toEqual(expectedRecurrences)
    })
  })
})

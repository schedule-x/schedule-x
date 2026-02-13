import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { datetime, recurrence } from '../../__test__/test-utils'

describe('Getting monthly recurrences', () => {
  describe('Using FREQ and COUNT', () => {
    it('should return the correct recurrences', () => {
      const expectedNumberOfRecurrences = 10
      const rset = new RecurrenceSet({
        rrule: `FREQ=MONTHLY;COUNT=${expectedNumberOfRecurrences}`,
        dtstart: datetime('2024-01-01 10:30'),
        dtend: datetime('2024-01-01 11:30'),
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toHaveLength(expectedNumberOfRecurrences)
      expect(recurrences).toEqual([
        recurrence(datetime('2024-01-01 10:30'), datetime('2024-01-01 11:30')),
        recurrence(datetime('2024-02-01 10:30'), datetime('2024-02-01 11:30')),
        recurrence(datetime('2024-03-01 10:30'), datetime('2024-03-01 11:30')),
        recurrence(datetime('2024-04-01 10:30'), datetime('2024-04-01 11:30')),
        recurrence(datetime('2024-05-01 10:30'), datetime('2024-05-01 11:30')),
        recurrence(datetime('2024-06-01 10:30'), datetime('2024-06-01 11:30')),
        recurrence(datetime('2024-07-01 10:30'), datetime('2024-07-01 11:30')),
        recurrence(datetime('2024-08-01 10:30'), datetime('2024-08-01 11:30')),
        recurrence(datetime('2024-09-01 10:30'), datetime('2024-09-01 11:30')),
        recurrence(datetime('2024-10-01 10:30'), datetime('2024-10-01 11:30')),
      ])
    })
  })
  it('should exclude datetimes specified in exdate', () => {
    const exdate = [
      datetime('2025-06-01 10:30'),
      datetime('2025-07-01 10:30'),
      datetime('2025-08-01 10:30'),
    ]
    const rset = new RecurrenceSet({
      rrule: 'FREQ=MONTHLY;COUNT=5',
      dtstart: datetime('2025-05-01 10:30'),
      dtend: datetime('2025-05-01 11:30'),
      exdate,
    })

    const recurrences = rset.getRecurrences()

    const excludedFormattedDates = [
      recurrence(datetime('2025-06-01 10:30'), datetime('2025-06-01 11:30')),
      recurrence(datetime('2025-07-01 10:30'), datetime('2025-07-01 11:30')),
      recurrence(datetime('2025-08-01 10:30'), datetime('2025-08-01 11:30')),
    ]

    expect(recurrences).toEqual([
      recurrence(datetime('2025-05-01 10:30'), datetime('2025-05-01 11:30')),
      recurrence(datetime('2025-09-01 10:30'), datetime('2025-09-01 11:30')),
    ])
    expect(recurrences).toHaveLength(2)
    expect(recurrences).toEqual(
      expect.not.arrayContaining(excludedFormattedDates)
    )
  })
})

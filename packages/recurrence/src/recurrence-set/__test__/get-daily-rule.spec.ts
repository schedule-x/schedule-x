import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime, recurrence } from '../../__test__/test-utils'

describe('Getting daily recurrences', () => {
  describe('Using FREQ, COUNT and INTERVAL', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=6;INTERVAL=2',
        dtstart: datetime('2024-02-02 06:30'),
        dtend: datetime('2024-02-02 08:00'),
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(datetime('2024-02-02 06:30'), datetime('2024-02-02 08:00')),
        recurrence(datetime('2024-02-04 06:30'), datetime('2024-02-04 08:00')),
        recurrence(datetime('2024-02-06 06:30'), datetime('2024-02-06 08:00')),
        recurrence(datetime('2024-02-08 06:30'), datetime('2024-02-08 08:00')),
        recurrence(datetime('2024-02-10 06:30'), datetime('2024-02-10 08:00')),
        recurrence(datetime('2024-02-12 06:30'), datetime('2024-02-12 08:00')),
      ])
    })
    it('should exclude datetimes specified in exdate', () => {
      const exdate = [
        datetime('2025-05-04 06:30'),
        datetime('2025-05-08 06:30'),
      ]
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=8;INTERVAL=2',
        dtstart: datetime('2025-05-02 06:30'),
        dtend: datetime('2025-05-02 08:00'),
        exdate: exdate,
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        recurrence(datetime('2025-05-02 06:30'), datetime('2025-05-02 08:00')),
        recurrence(datetime('2025-05-06 06:30'), datetime('2025-05-06 08:00')),
        recurrence(datetime('2025-05-10 06:30'), datetime('2025-05-10 08:00')),
        recurrence(datetime('2025-05-12 06:30'), datetime('2025-05-12 08:00')),
        recurrence(datetime('2025-05-14 06:30'), datetime('2025-05-14 08:00')),
        recurrence(datetime('2025-05-16 06:30'), datetime('2025-05-16 08:00')),
      ])

      const excludedFormattedDates = [
        recurrence(datetime('2025-05-04 06:30'), datetime('2025-05-04 08:00')),
        recurrence(datetime('2025-05-08 06:30'), datetime('2025-05-08 08:00')),
      ]
      expect(recurrences).toEqual(
        expect.not.arrayContaining(excludedFormattedDates)
      )
      expect(recurrences.length).toBe(6)
    })

    describe('Using FREQ, UNTIL and INTERVAL', () => {
      it('should return the correct recurrences', () => {
        const rset = new RecurrenceSet({
          rrule: 'FREQ=DAILY;UNTIL=20240212T063000;INTERVAL=2',
          dtstart: datetime('2024-02-02 06:30'),
          dtend: datetime('2024-02-02 08:00'),
        })

        const recurrences = rset.getRecurrences()

        expect(recurrences).toEqual([
          recurrence(
            datetime('2024-02-02 06:30'),
            datetime('2024-02-02 08:00')
          ),
          recurrence(
            datetime('2024-02-04 06:30'),
            datetime('2024-02-04 08:00')
          ),
          recurrence(
            datetime('2024-02-06 06:30'),
            datetime('2024-02-06 08:00')
          ),
          recurrence(
            datetime('2024-02-08 06:30'),
            datetime('2024-02-08 08:00')
          ),
          recurrence(
            datetime('2024-02-10 06:30'),
            datetime('2024-02-10 08:00')
          ),
          recurrence(
            datetime('2024-02-12 06:30'),
            datetime('2024-02-12 08:00')
          ),
        ])
      })
      it('should generate daily recurrences every 2 days excluding specified exdate', () => {
        const exdate = [date('2025-05-08'), date('2025-05-12')]

        const rset = new RecurrenceSet({
          rrule: 'FREQ=DAILY;UNTIL=20250520;INTERVAL=2',
          dtstart: date('2025-05-02'),
          dtend: date('2025-05-02'),
          exdate,
        })

        const recurrences = rset.getRecurrences()

        expect(recurrences).toEqual([
          recurrence(date('2025-05-02'), date('2025-05-02')),
          recurrence(date('2025-05-04'), date('2025-05-04')),
          recurrence(date('2025-05-06'), date('2025-05-06')),
          recurrence(date('2025-05-10'), date('2025-05-10')),
          recurrence(date('2025-05-14'), date('2025-05-14')),
          recurrence(date('2025-05-16'), date('2025-05-16')),
          recurrence(date('2025-05-18'), date('2025-05-18')),
          recurrence(date('2025-05-20'), date('2025-05-20')),
        ])

        const excludedFormattedDates = [
          recurrence(date('2025-05-08'), date('2025-05-08')),
          recurrence(date('2025-05-12'), date('2025-05-12')),
        ]

        expect(recurrences).toEqual(
          expect.not.arrayContaining(excludedFormattedDates)
        )
        expect(recurrences.length).toBe(8)
      })
    })

    describe('Using FREQ, BYDAY and INTERVAL', () => {
      it('should return all Saturdays and Sundays in February 2024', () => {
        const rset = new RecurrenceSet({
          rrule: 'FREQ=WEEKLY;BYDAY=SA,SU;UNTIL=20240229',
          dtstart: date('2024-02-03'),
          dtend: date('2024-02-03'),
        })

        const recurrences = rset.getRecurrences()

        expect(recurrences).toEqual([
          recurrence(date('2024-02-03'), date('2024-02-03')),
          recurrence(date('2024-02-04'), date('2024-02-04')),
          recurrence(date('2024-02-10'), date('2024-02-10')),
          recurrence(date('2024-02-11'), date('2024-02-11')),
          recurrence(date('2024-02-17'), date('2024-02-17')),
          recurrence(date('2024-02-18'), date('2024-02-18')),
          recurrence(date('2024-02-24'), date('2024-02-24')),
          recurrence(date('2024-02-25'), date('2024-02-25')),
        ])
      })
      it('should return all mondays but one in May 2025', () => {
        const exdate = [date('2025-05-12')]
        const rset = new RecurrenceSet({
          rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250531',
          dtstart: date('2025-05-01'),
          dtend: date('2025-05-01'),
          exdate,
        })

        const recurrences = rset.getRecurrences()

        const expectedRecurrences = [
          recurrence(date('2025-05-05'), date('2025-05-05')),
          recurrence(date('2025-05-19'), date('2025-05-19')),
          recurrence(date('2025-05-26'), date('2025-05-26')),
        ]

        expect(recurrences).toEqual(expectedRecurrences)
        expect(recurrences).not.toEqual(
          expect.arrayContaining([
            recurrence(date('2025-05-12'), date('2025-05-12')),
          ])
        )
        expect(recurrences.length).toBe(3)
      })
    })
  })
})

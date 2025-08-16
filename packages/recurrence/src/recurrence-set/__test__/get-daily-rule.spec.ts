import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Getting daily recurrences', () => {
  describe('Using FREQ, COUNT and INTERVAL', () => {
    it('should return the correct recurrences', () => {
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=6;INTERVAL=2',
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
          start: '2024-02-04 06:30',
          end: '2024-02-04 08:00',
        },
        {
          start: '2024-02-06 06:30',
          end: '2024-02-06 08:00',
        },
        {
          start: '2024-02-08 06:30',
          end: '2024-02-08 08:00',
        },
        {
          start: '2024-02-10 06:30',
          end: '2024-02-10 08:00',
        },
        {
          start: '2024-02-12 06:30',
          end: '2024-02-12 08:00',
        },
      ])
    })
    it('should exclude datetimes specified in exdate', () => {
      const exdate = ['20250504T063000', '20250508T063000']
      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=8;INTERVAL=2',
        dtstart: '20250502T063000',
        dtend: '20250502T080000',
        exdate: exdate,
      })

      const recurrences = rset.getRecurrences()

      expect(recurrences).toEqual([
        {
          start: '2025-05-02 06:30',
          end: '2025-05-02 08:00',
        },
        {
          start: '2025-05-06 06:30',
          end: '2025-05-06 08:00',
        },
        {
          start: '2025-05-10 06:30',
          end: '2025-05-10 08:00',
        },
        {
          start: '2025-05-12 06:30',
          end: '2025-05-12 08:00',
        },
        {
          start: '2025-05-14 06:30',
          end: '2025-05-14 08:00',
        },
        {
          start: '2025-05-16 06:30',
          end: '2025-05-16 08:00',
        },
      ])

      const excludedFormattedDates = [
        {
          start: '2025-05-04 06:30',
          end: '2025-05-04 08:00',
        },
        {
          start: '2025-05-08 06:30',
          end: '2025-05-08 08:00',
        },
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
            start: '2024-02-04 06:30',
            end: '2024-02-04 08:00',
          },
          {
            start: '2024-02-06 06:30',
            end: '2024-02-06 08:00',
          },
          {
            start: '2024-02-08 06:30',
            end: '2024-02-08 08:00',
          },
          {
            start: '2024-02-10 06:30',
            end: '2024-02-10 08:00',
          },
          {
            start: '2024-02-12 06:30',
            end: '2024-02-12 08:00',
          },
        ])
      })
      it('should generate daily recurrences every 2 days excluding specified exdate', () => {
        const exdate = ['20250508', '20250512']

        const rset = new RecurrenceSet({
          rrule: 'FREQ=DAILY;UNTIL=20250520;INTERVAL=2',
          dtstart: '20250502',
          dtend: '20250502',
          exdate,
        })

        const recurrences = rset.getRecurrences()

        expect(recurrences).toEqual([
          {
            start: '2025-05-02',
            end: '2025-05-02',
          },
          {
            start: '2025-05-04',
            end: '2025-05-04',
          },
          {
            start: '2025-05-06',
            end: '2025-05-06',
          },
          {
            start: '2025-05-10',
            end: '2025-05-10',
          },
          {
            start: '2025-05-14',
            end: '2025-05-14',
          },
          {
            start: '2025-05-16',
            end: '2025-05-16',
          },
          {
            start: '2025-05-18',
            end: '2025-05-18',
          },
          {
            start: '2025-05-20',
            end: '2025-05-20',
          },
        ])

        const excludedFormattedDates = [
          {
            start: '2025-05-08',
            end: '2025-05-08',
          },
          {
            start: '2025-05-12',
            end: '2025-05-12',
          },
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
          dtstart: '20240203',
          dtend: '20240203',
        })

        const recurrences = rset.getRecurrences()

        expect(recurrences).toEqual([
          {
            start: '2024-02-03',
            end: '2024-02-03',
          },
          {
            start: '2024-02-04',
            end: '2024-02-04',
          },
          {
            start: '2024-02-10',
            end: '2024-02-10',
          },
          {
            start: '2024-02-11',
            end: '2024-02-11',
          },
          {
            start: '2024-02-17',
            end: '2024-02-17',
          },
          {
            start: '2024-02-18',
            end: '2024-02-18',
          },
          {
            start: '2024-02-24',
            end: '2024-02-24',
          },
          {
            start: '2024-02-25',
            end: '2024-02-25',
          },
        ])
      })
      it('should return all mondays but one in May 2025', () => {
        const exdate = ['20250512']
        const rset = new RecurrenceSet({
          rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250531',
          dtstart: '20250501',
          dtend: '20250501',
          exdate,
        })

        const recurrences = rset.getRecurrences()

        const expectedRecurrences = [
          {
            start: '2025-05-05',
            end: '2025-05-05',
          },
          {
            start: '2025-05-19',
            end: '2025-05-19',
          },
          {
            start: '2025-05-26',
            end: '2025-05-26',
          },
        ]

        expect(recurrences).toEqual(expectedRecurrences)
        expect(recurrences).not.toEqual(
          expect.arrayContaining([
            {
              start: '2025-05-12',
              end: '2025-05-12',
            },
          ])
        )
        expect(recurrences.length).toBe(3)
      })
    })
  })
})

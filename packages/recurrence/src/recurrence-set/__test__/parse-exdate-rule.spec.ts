import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'
import { date, datetime } from '../../__test__/test-utils'

describe('Parsing an Exdate string array into a map', () => {
  describe('Using dates', () => {
    it('should parse the dates from RFC5545 to SX format', () => {
      const exdate = [
        date('2025-05-07'),
        date('2025-05-15'),
        date('2025-05-21'),
        date('2025-05-30'),
        date('2025-05-31'),
      ]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250531',
        dtstart: date('2025-05-01'),
        dtend: date('2025-05-01'),
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(
        new Map([
          ['20250507', date('2025-05-07')],
          ['20250515', date('2025-05-15')],
          ['20250521', date('2025-05-21')],
          ['20250530', date('2025-05-30')],
          ['20250531', date('2025-05-31')],
        ])
      )
      expect(mappedExdate?.size).toEqual(exdate.length)
    })
    it('should not affect the dtstart', () => {
      const exdate = [date('2025-06-15'), date('2025-06-19')]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=DAILY;COUNT=5',
        dtstart: date('2025-06-15'),
        dtend: date('2025-06-15'),
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(new Map([['20250619', date('2025-06-19')]]))
      expect(mappedExdate?.size).toEqual(1)
    })
  })
  describe('Using datetimes', () => {
    it('should parse the datetimes from RFC5545 to SX format', () => {
      const exdate = [
        datetime('2025-05-07 01:00'),
        datetime('2025-05-15 01:00'),
        datetime('2025-05-21 01:00'),
        datetime('2025-05-30 01:00'),
        datetime('2025-05-31 01:00'),
      ]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250509',
        dtstart: datetime('2025-05-01 01:00'),
        dtend: datetime('2024-05-31 02:00'),
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(
        new Map([
          ['20250507T010000', datetime('2025-05-07 01:00')],
          ['20250515T010000', datetime('2025-05-15 01:00')],
          ['20250521T010000', datetime('2025-05-21 01:00')],
          ['20250530T010000', datetime('2025-05-30 01:00')],
          ['20250531T010000', datetime('2025-05-31 01:00')],
        ])
      )
      expect(mappedExdate?.size).toEqual(exdate.length)
    })
    it('should not affect the dtstart', () => {
      const exdate = [
        datetime('2025-08-01 15:00'),
        datetime('2025-08-22 15:00'),
      ]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;UNTIL=20250831',
        dtstart: datetime('2025-08-01 15:00'),
        dtend: datetime('2025-08-01 16:00'),
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(
        new Map([['20250822T150000', datetime('2025-08-22 15:00')]])
      )
      expect(mappedExdate?.size).toEqual(1)
    })
  })
})

import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { RecurrenceSet } from '../recurrence-set'

describe('Parsing an Exdate string array into a map', () => {
  describe('Using dates', () => {
    it('should parse the dates from RFC5545 to SX format', () => {
      const exdate = [
        '20250501',
        '20250507',
        '20250515',
        '20250521',
        '20250530',
        '20250531',
      ]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250509',
        dtstart: '20250501',
        dtend: '20240531',
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(
        new Map<string, boolean>([
          ['2025-05-01', true],
          ['2025-05-07', true],
          ['2025-05-15', true],
          ['2025-05-21', true],
          ['2025-05-30', true],
          ['2025-05-31', true],
        ])
      )
      expect(mappedExdate?.size).toEqual(exdate.length)
    })
  })
  describe('Using datetimes', () => {
    it('should parse the datetimes from RFC5545 to SX format', () => {
      const exdate = [
        '20250501T010000',
        '20250507T010000',
        '20250515T010000',
        '20250521T010000',
        '20250530T010000',
        '20250531T010000',
      ]

      const rset = new RecurrenceSet({
        rrule: 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20250509',
        dtstart: '20250501T010000',
        dtend: '20240531T020000',
        exdate,
      })

      const mappedExdate = rset.getExdate()

      expect(mappedExdate).toEqual(
        new Map<string, boolean>([
          ['2025-05-01 01:00', true],
          ['2025-05-07 01:00', true],
          ['2025-05-15 01:00', true],
          ['2025-05-21 01:00', true],
          ['2025-05-30 01:00', true],
          ['2025-05-31 01:00', true],
        ])
      )
      expect(mappedExdate?.size).toEqual(exdate.length)
    })
  })
})

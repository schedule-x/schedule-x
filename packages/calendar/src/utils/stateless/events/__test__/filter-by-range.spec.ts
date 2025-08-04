import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { filterByRange } from '../filter-by-range'
import 'temporal-polyfill/global'


describe('filterByRange', () => {
  describe('excluding events that are out of range', () => {
    it('should filter out an event that starts and ends before range starts', () => {
      const event: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-01T11:00:00.000Z[UTC]'),
        style: {},
      }

      const range = {
        start: Temporal.ZonedDateTime.from('2024-01-02T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-02T23:59:59.999Z[UTC]'),
      }

      const result = filterByRange([event], range, 'UTC')

      expect(result).toEqual([])
    })

    it('should filter out an event that starts after range end', () => {
      const event: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-01-02T10:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-02T11:00:00.000Z[UTC]'),
        style: {},
      }

      const range = {
        start: Temporal.ZonedDateTime.from('2024-01-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-01T23:59:59.999Z[UTC]'),
      }

      const result = filterByRange([event], range, 'UTC')

      expect(result).toEqual([])
    })
  })

  describe('including events that are in range', () => {
    it('should include an event that starts before range start and ends after range start', () => {
      const event: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-02T11:00:00.000Z[UTC]'),
        style: {},
      }

      const range = {
        start: Temporal.ZonedDateTime.from('2024-01-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-01T23:59:59.999Z[UTC]'),
      }

      const result = filterByRange([event], range, 'UTC')

      expect(result).toEqual([event])
    })

    it('should include an event that starts in range but ends after range end', () => {
      const event: BackgroundEvent = {
        start: Temporal.ZonedDateTime.from('2024-01-01T10:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-02T11:00:00.000Z[UTC]'),
        style: {},
      }

      const range = {
        start: Temporal.ZonedDateTime.from('2024-01-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-01T23:59:59.999Z[UTC]'),
      }

      const result = filterByRange([event], range, 'UTC')

      expect(result).toEqual([event])
    })

    it('should include an event if it starts before range and ends after range', () => {
      const event: BackgroundEvent = {
        start: Temporal.PlainDate.from('2024-01-01'),
        end: Temporal.PlainDate.from('2024-01-03'),
        style: {},
      }

      const range = {
        start: Temporal.ZonedDateTime.from('2024-01-02T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-01-02T23:59:59.999Z[UTC]'),
      }

      const result = filterByRange([event], range, 'UTC')

      expect(result).toEqual([event])
    })
  })
})

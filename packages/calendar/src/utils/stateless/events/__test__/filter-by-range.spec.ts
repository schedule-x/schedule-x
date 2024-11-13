import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { filterByRange } from '../filter-by-range'

describe('filterByRange', () => {
  describe('excluding events that are out of range', () => {
    it('should filter out an event that starts and ends before range starts', () => {
      const event: BackgroundEvent = {
        start: '2024-01-01 10:00',
        end: '2024-01-01 11:00',
        style: {},
      }

      const range = {
        start: '2024-01-02',
        end: '2024-01-02',
      }

      const result = filterByRange([event], range)

      expect(result).toEqual([])
    })

    it('should filter out an event that starts after range end', () => {
      const event: BackgroundEvent = {
        start: '2024-01-02 10:00',
        end: '2024-01-02 11:00',
        style: {},
      }

      const range = {
        start: '2024-01-01',
        end: '2024-01-01',
      }

      const result = filterByRange([event], range)

      expect(result).toEqual([])
    })
  })

  describe('including events that are in range', () => {
    it('should include an event that starts before range start and ends after range start', () => {
      const event: BackgroundEvent = {
        start: '2024-01-01 10:00',
        end: '2024-01-02 11:00',
        style: {},
      }

      const range = {
        start: '2024-01-01',
        end: '2024-01-01',
      }

      const result = filterByRange([event], range)

      expect(result).toEqual([event])
    })

    it('should include an event that starts in range but ends after range end', () => {
      const event: BackgroundEvent = {
        start: '2024-01-01 10:00',
        end: '2024-01-02 11:00',
        style: {},
      }

      const range = {
        start: '2024-01-01',
        end: '2024-01-01',
      }

      const result = filterByRange([event], range)

      expect(result).toEqual([event])
    })

    it('should include an event if it starts before range and ends after range', () => {
      const event: BackgroundEvent = {
        start: '2024-01-01',
        end: '2024-01-03',
        style: {},
      }

      const range = {
        start: '2024-01-02',
        end: '2024-01-02',
      }

      const result = filterByRange([event], range)

      expect(result).toEqual([event])
    })
  })
})

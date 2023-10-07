import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getTimeStamp } from '../get-time-stamp'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

describe('Getting the time stamp for the event modal', () => {
  describe('Time stamps for full single day events', () => {
    const singleFullDayEvent: Partial<CalendarEventInternal> = {
      time: {
        start: '2023-10-06',
        end: '2023-10-06',
      },
      _isSingleDayFullDay: true,
    }
    it('should return a German time stamp for a single day timed event', () => {
      const expected = '6. Oktober 2023'

      const result = getTimeStamp(singleFullDayEvent, 'de-DE')

      expect(result).toEqual(expected)
    })

    it('should return an English time stamp for a single day timed event', () => {
      const expected = 'October 6, 2023'

      const result = getTimeStamp(singleFullDayEvent, 'en-US')

      expect(result).toEqual(expected)
    })
  })

  describe('Time stamps for full multi day events', () => {
    const multiFullDayEvent: Partial<CalendarEventInternal> = {
      time: {
        start: '2023-10-06',
        end: '2023-10-08',
      },
      _isMultiDayFullDay: true,
    }
    it('should return a German time stamp for a multi day timed event', () => {
      const expected = '6. Oktober 2023 – 8. Oktober 2023'

      const result = getTimeStamp(multiFullDayEvent, 'de-DE')

      expect(result).toEqual(expected)
    })

    it('should return an English time stamp for a multi day timed event', () => {
      const expected = 'October 6, 2023 – October 8, 2023'

      const result = getTimeStamp(multiFullDayEvent, 'en-US')

      expect(result).toEqual(expected)
    })
  })

  describe('Time stamps for single day timed events', () => {
    const singleDayTimedEvent: Partial<CalendarEventInternal> = {
      time: {
        start: '2023-10-06 20:07',
        end: '2023-10-06 21:07',
      },
      _isSingleDayTimed: true,
    }

    it('should return a German time stamp for a single day timed event', () => {
      const expected = '6. Oktober 2023 ⋅ 20:07 – 21:07'

      const result = getTimeStamp(singleDayTimedEvent, 'de-DE')

      expect(result).toEqual(expected)
    })

    it('should return an English time stamp for a single day timed event', () => {
      const expected = 'October 6, 2023 ⋅ 8:07 PM – 9:07 PM'

      const result = getTimeStamp(singleDayTimedEvent, 'en-US')

      expect(result).toEqual(expected)
    })
  })

  describe('Time stamps for multi day timed events', () => {
    const multiDayTimedEvent: Partial<CalendarEventInternal> = {
      time: {
        start: '2023-10-06 20:07',
        end: '2023-10-08 21:07',
      },
      _isMultiDayTimed: true,
    }

    it('should return a German time stamp for a multi day timed event', () => {
      const expected = '6. Oktober 2023, 20:07 – 8. Oktober 2023, 21:07'

      const result = getTimeStamp(multiDayTimedEvent, 'de-DE')

      expect(result).toEqual(expected)
    })

    it('should return an English time stamp for a multi day timed event', () => {
      const expected = 'October 6, 2023, 8:07 PM – October 8, 2023, 9:07 PM'

      const result = getTimeStamp(multiDayTimedEvent, 'en-US')

      expect(result).toEqual(expected)
    })
  })
})

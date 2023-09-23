/* eslint-disable max-lines */
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '../../config/calendar-config.builder'
import { CalendarEventTime } from '../calendar-event.interface'
import CalendarEventBuilder from '../calendar-event.builder'

describe('CalendarEventImpl', () => {
  describe('the event time type in a hybrid day', () => {
    const _config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '12:00',
        end: '06:00',
      })
      .build()
    const createEvent = (eventTime: CalendarEventTime) =>
      new CalendarEventBuilder(_config, '1', eventTime).build()

    it.each([
      {
        start: '2020-01-01 01:00',
        end: '2020-01-01 02:00',
      },
      {
        start: '2020-01-01 05:00',
        end: '2020-01-01 06:00',
      },
      {
        start: '2020-01-01 12:00',
        end: '2020-01-01 13:00',
      },
    ])(
      'should be classified as a single hybrid day timed event and a single day timed event',
      (eventTime) => {
        const calendarEvent = createEvent(eventTime)

        expect(calendarEvent._isSingleDayTimed).toBe(true)
        expect(calendarEvent._isSingleDayFullDay).toBe(false)
        expect(calendarEvent._isMultiDayTimed).toBe(false)
        expect(calendarEvent._isMultiDayFullDay).toBe(false)
        expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
      }
    )

    it.each([
      {
        start: '2020-01-01 23:00',
        end: '2020-01-02 01:00',
      },
      {
        start: '2020-01-01 23:59',
        end: '2020-01-02 00:00',
      },
    ])(
      'should be classified as a single hybrid day event and a multi day timed event',
      (eventTime) => {
        const calendarEvent = createEvent(eventTime)

        expect(calendarEvent._isSingleDayTimed).toBe(false)
        expect(calendarEvent._isSingleDayFullDay).toBe(false)
        expect(calendarEvent._isMultiDayTimed).toBe(true)
        expect(calendarEvent._isMultiDayFullDay).toBe(false)
        expect(calendarEvent._isSingleHybridDayTimed).toBe(true)
      }
    )

    it.each([
      {
        start: '2020-01-01 00:00',
        end: '2020-01-01 23:59',
      },
      {
        start: '2020-01-01 05:59',
        end: '2020-01-01 06:01',
      },
      {
        start: '2020-01-01 11:59',
        end: '2020-01-01 12:00',
      },
    ])(
      'should not be classified as a single hybrid day event, only as single day timed',
      (eventTime) => {
        const calendarEvent = createEvent(eventTime)

        expect(calendarEvent._isSingleDayTimed).toBe(true)
        expect(calendarEvent._isSingleDayFullDay).toBe(false)
        expect(calendarEvent._isMultiDayTimed).toBe(false)
        expect(calendarEvent._isMultiDayFullDay).toBe(false)
        expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
      }
    )

    it.each([
      {
        start: '2020-01-01 23:00',
        end: '2020-01-03 01:00',
      },
    ])(
      'should not be classified as a single hybrid day event, only as multi day timed',
      (eventTime) => {
        const calendarEvent = createEvent(eventTime)

        expect(calendarEvent._isSingleDayTimed).toBe(false)
        expect(calendarEvent._isSingleDayFullDay).toBe(false)
        expect(calendarEvent._isMultiDayTimed).toBe(true)
        expect(calendarEvent._isMultiDayFullDay).toBe(false)
        expect(calendarEvent._isSingleHybridDayTimed).toBe(false)
      }
    )
  })
})

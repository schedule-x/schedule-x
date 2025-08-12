import { describe, it } from '../../../testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '@schedule-x/calendar/src/utils/stateful/config/calendar-config.builder'
import CalendarEventBuilder from '../calendar-event.builder'
import {
  assertIsMultiDayTimed,
  assertIsSingleDayTimed,
  assertIsSingleDayTimedAndHybridDayTimed,
  assertIsSingleHybridTimedAndMultipleDayTimed,
} from './utils'
import 'temporal-polyfill/global'

describe('CalendarEventImpl', () => {
  describe('the event time type in a hybrid day', () => {
    const _config = new CalendarConfigBuilder()
      .withTimezone('Europe/Berlin')
      .withDayBoundaries({
        start: '12:00',
        end: '06:00',
      })
      .build()
    const createEvent = (eventTime: {
      start: Temporal.ZonedDateTime | Temporal.PlainDate
      end: Temporal.ZonedDateTime | Temporal.PlainDate
    }) =>
      new CalendarEventBuilder(
        _config,
        '1',
        eventTime.start,
        eventTime.end
      ).build()

    it.each([
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T01:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T02:00:00+01:00[Europe/Berlin]'
        ),
      },
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T05:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T06:00:00+01:00[Europe/Berlin]'
        ),
      },
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T12:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T13:00:00+01:00[Europe/Berlin]'
        ),
      },
    ])(
      'should be classified as a single hybrid day timed event and a single day timed event',
      (eventTime) => {
        assertIsSingleDayTimedAndHybridDayTimed(createEvent(eventTime))
      }
    )

    it.each([
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T23:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-02T01:00:00+01:00[Europe/Berlin]'
        ),
      },
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T23:59:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-02T00:00:00+01:00[Europe/Berlin]'
        ),
      },
    ])(
      'should be classified as a single hybrid day event and a multi day timed event',
      (eventTime) => {
        assertIsSingleHybridTimedAndMultipleDayTimed(createEvent(eventTime))
      }
    )

    it.each([
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T00:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T23:59:00+01:00[Europe/Berlin]'
        ),
      },
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T05:59:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T06:01:00+01:00[Europe/Berlin]'
        ),
      },
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T11:59:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-01T12:00:00+01:00[Europe/Berlin]'
        ),
      },
    ])(
      'should not be classified as a single hybrid day event, only as single day timed',
      (eventTime) => {
        assertIsSingleDayTimed(createEvent(eventTime))
      }
    )

    it.each([
      {
        start: Temporal.ZonedDateTime.from(
          '2020-01-01T23:00:00+01:00[Europe/Berlin]'
        ),
        end: Temporal.ZonedDateTime.from(
          '2020-01-03T01:00:00+01:00[Europe/Berlin]'
        ),
      },
    ])(
      'should not be classified as a single hybrid day event, only as multi day timed',
      (eventTime) => {
        assertIsMultiDayTimed(createEvent(eventTime))
      }
    )
  })
})

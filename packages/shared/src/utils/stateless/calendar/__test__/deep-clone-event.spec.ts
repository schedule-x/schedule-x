import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { deepCloneEvent } from '../deep-clone-event'
import CalendarEventBuilder from '../calendar-event/calendar-event.builder'
import CalendarAppSingleton from '../../../../interfaces/calendar/calendar-app-singleton'
import { stubInterface } from 'ts-sinon'
import 'temporal-polyfill/global'
import { signal } from '@preact/signals'
import { IANATimezone } from '../../time/tzdb'

describe('deep cloning an event', () => {
  let $app: CalendarAppSingleton

  beforeEach(() => {
    $app = stubInterface<CalendarAppSingleton>()
    $app.config = {
      ...$app.config,
      timezone: signal('Europe/Berlin' as IANATimezone),
    }
  })

  it('should copy title', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withTitle('title')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.title).toEqual('title')
  })

  it('should copy start and end', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withTitle('title')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.start).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]')
    )
    expect(clonedEvent.end).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
  })

  it('should copy description', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withDescription('description')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.description).toEqual('description')
  })

  it('should copy location', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withLocation('location')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.location).toEqual('location')
  })

  it('should copy calendarId', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withCalendarId('calendarId')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.calendarId).toEqual('calendarId')
  })

  it('should copy _options', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withOptions({ disableDND: true })
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent._options?.disableDND).toEqual(true)
  })

  it('should copy _customContent', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withCustomContent({ dateGrid: 'content' })
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent._customContent?.dateGrid).toEqual('content')
  })

  it('should copy _foreignProperties', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+01:00[Europe/Berlin]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+01:00[Europe/Berlin]')
    )
      .withForeignProperties({ key: 'value' })
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent._getForeignProperties().key).toEqual('value')
  })

  it('should use the original timezone of the event externally, but internally use the timezone of the calendar', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+09:00[Asia/Tokyo]'),
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+09:00[Asia/Tokyo]')
    ).build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent._getExternalEvent().start).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T10:34:00+09:00[Asia/Tokyo]')
    )
    expect(clonedEvent._getExternalEvent().end).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T11:34:00+09:00[Asia/Tokyo]')
    )
    // same but adjusted for europe berlin timezone
    expect(clonedEvent.start).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T02:34:00+01:00[Europe/Berlin]')
    )
    expect(clonedEvent.end).toEqual(
      Temporal.ZonedDateTime.from('2020-02-17T03:34:00+01:00[Europe/Berlin]')
    )
  })
})

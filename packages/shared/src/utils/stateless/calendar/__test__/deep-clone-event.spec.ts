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

describe('deep cloning an event', () => {
  let $app: CalendarAppSingleton

  beforeEach(() => {
    $app = stubInterface<CalendarAppSingleton>()
  })

  it('should copy title', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
    )
      .withTitle('title')
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent.start).toEqual('2020-02-17 10:34')
    expect(clonedEvent.end).toEqual('2020-02-17 11:34')
  })

  it('should copy description', () => {
    const calendarEvent = new CalendarEventBuilder(
      $app.config,
      'id',
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
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
      '2020-02-17 10:34',
      '2020-02-17 11:34'
    )
      .withForeignProperties({ key: 'value' })
      .build()

    const clonedEvent = deepCloneEvent(calendarEvent, $app)

    expect(clonedEvent._getForeignProperties().key).toEqual('value')
  })
})

import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarEventTime } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import CalendarEventBuilder from '../../../stateful/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import { sortEventsByStart } from '../sort-by-start-date'

describe('sorting events based on time', () => {
  const config = new CalendarConfigBuilder().build()
  const createEvent = (time: CalendarEventTime) => {
    return new CalendarEventBuilder(config, '1', time).build()
  }

  it('should sort events according to time in ascending order', () => {
    const eventExpected1 = createEvent({
      start: '2020-06-27 00:00',
      end: '2020-06-27 01:00',
    })
    const eventExpected2 = createEvent({
      start: '2020-06-27 01:00',
      end: '2020-06-27 02:00',
    })
    const eventExpected3 = createEvent({
      start: '2020-06-27 02:00',
      end: '2020-06-27 03:00',
    })
    const eventExpected4 = createEvent({
      start: '2020-06-28 03:00',
      end: '2020-06-28 04:00',
    })

    const result = [
      eventExpected3,
      eventExpected1,
      eventExpected2,
      eventExpected4,
    ].sort(sortEventsByStart)

    expect(result[0]).toBe(eventExpected1)
    expect(result[1]).toBe(eventExpected2)
    expect(result[2]).toBe(eventExpected3)
    expect(result[3]).toBe(eventExpected4)
  })
})

import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarConfigBuilder from '@schedule-x/calendar/src/utils/stateful/config/calendar-config.builder'
import CalendarEventBuilder from '../calendar-event.builder'

describe('an internal calendar event', () => {
  describe('an event with only time and an id', () => {
    const _config = new CalendarConfigBuilder().build()

    const EVENT_START = '2009-09-07 04:00'
    const EVENT_END = '2009-09-07 05:45'
    const EVENT_TITLE = 'Meeting about stuff'
    const EVENT_LOCATION = 'Starbucks'
    const EVENT_PEOPLE = ['John', 'Jane']
    const EVENT_CALENDAR_ID = 'work'
    const EVENT_DESCRIPTION = 'Bring notebook and pen for jotting stuff down'
    const EVENT_HAS_DECLINED_STATUS = false
    const EVENT_HOST_PERSON_ID = '8475jh4j5h4bj5j4k54jb4'
    const EVENT_FOREIGN_PROPERTIES = {
      hasDeclined: EVENT_HAS_DECLINED_STATUS,
      hostPersonId: EVENT_HOST_PERSON_ID,
    }

    const event = new CalendarEventBuilder(_config, '1', {
      start: EVENT_START,
      end: EVENT_END,
    })
      .withTitle(EVENT_TITLE)
      .withLocation(EVENT_LOCATION)
      .withPeople(EVENT_PEOPLE)
      .withCalendarId(EVENT_CALENDAR_ID)
      .withDescription(EVENT_DESCRIPTION)
      .withForeignProperties(EVENT_FOREIGN_PROPERTIES)
      .build()

    it('should get all properties for the event, including the foreign properties', () => {
      const eventExternal = event._getExternalEvent()

      expect(eventExternal.id).toBe('1')
      expect(eventExternal.time.start).toBe(EVENT_START)
      expect(eventExternal.time.end).toBe(EVENT_END)
      expect(eventExternal.title).toBe(EVENT_TITLE)
      expect(eventExternal.location).toBe(EVENT_LOCATION)
      expect(eventExternal.people).toBe(EVENT_PEOPLE)
      expect(eventExternal.calendarId).toBe(EVENT_CALENDAR_ID)
      expect(eventExternal.description).toBe(EVENT_DESCRIPTION)
      expect(eventExternal.hasDeclined).toBe(EVENT_HAS_DECLINED_STATUS)
      expect(eventExternal.hostPersonId).toBe(EVENT_HOST_PERSON_ID)
    })
  })
})

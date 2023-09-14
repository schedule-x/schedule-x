import {
  afterEach,
  describe,
  expect,
  it,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import CalendarEventBuilder from '../../../../utils/stateful/calendar-event/calendar-event.builder'
import { createCalendarAppSingleton } from '../../../../factory'
import { factory } from './utils'

describe('WeekDayEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('conditionally displaying info', () => {
    const $app = createCalendarAppSingleton({
      datePicker: {
        selectedDate: '2020-12-01',
      },
    })

    it('should not contain a title element if the event has no title', () => {
      const calendarEvent = new CalendarEventBuilder($app.config, '1', {
        start: '2020-12-01 10:00',
        end: '2020-12-01 11:00',
      }).build()
      factory($app, calendarEvent)

      expect(document.querySelector('.sx__week-day-event-title')).toBeNull()
    })

    it('should contain a title element if the event has a title', () => {
      const calendarEvent = new CalendarEventBuilder($app.config, '1', {
        start: '2020-12-01 10:00',
        end: '2020-12-01 11:00',
      })
        .withTitle('Coffee with Paul')
        .build()
      factory($app, calendarEvent)

      expect(document.querySelector('.sx__week-day-event-title')).not.toBeNull()
      expect(screen.queryByText('Coffee with Paul')).toBeTruthy()
    })

    it('should not display any people info if the event has no people', () => {
      const calendarEvent = new CalendarEventBuilder($app.config, '1', {
        start: '2020-12-01 10:00',
        end: '2020-12-01 11:00',
      }).build()
      factory($app, calendarEvent)

      expect(document.querySelector('.sx__week-day-event-people')).toBeNull()
    })

    it('should display people info if the event has people', () => {
      const calendarEvent = new CalendarEventBuilder($app.config, '1', {
        start: '2020-12-01 10:00',
        end: '2020-12-01 11:00',
      })
        .withPeople(['Paul', 'John'])
        .build()
      factory($app, calendarEvent)

      expect(
        document.querySelector('.sx__week-day-event-people')
      ).not.toBeNull()
      expect(screen.queryByText('Paul, John')).toBeTruthy()
    })
  })
})

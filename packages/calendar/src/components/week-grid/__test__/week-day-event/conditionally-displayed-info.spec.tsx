import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { renderComponent } from './utils'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

describe('WeekDayEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('conditionally displaying info', () => {
    const $app = __createAppWithViews__({
      datePicker: {
        selectedDate: '2020-12-01',
      },
    })

    it('should not contain a title element if the event has no title', () => {
      const calendarEvent = new CalendarEventBuilder(
        $app.config,
        '1',
        '2020-12-01 10:00',
        '2020-12-01 11:00'
      ).build()
      renderComponent($app, calendarEvent)

      expect(document.querySelector('.sx__time-grid-event-title')).toBeNull()
    })

    it('should contain a title element if the event has a title', () => {
      const expectedTitle = 'Coffee with Paul'
      const calendarEvent = new CalendarEventBuilder(
        $app.config,
        '1',
        '2020-12-01 10:00',
        '2020-12-01 11:00'
      )
        .withTitle(expectedTitle)
        .build()
      renderComponent($app, calendarEvent)

      expect(
        document.querySelector('.sx__time-grid-event-title')
      ).not.toBeNull()
      expect(screen.queryByText(expectedTitle)).toBeTruthy()
    })

    it('should not display any people info if the event has no people', () => {
      const calendarEvent = new CalendarEventBuilder(
        $app.config,
        '1',
        '2020-12-01 10:00',
        '2020-12-01 11:00'
      ).build()
      renderComponent($app, calendarEvent)

      expect(document.querySelector('.sx__time-grid-event-people')).toBeNull()
    })

    it('should display people info if the event has people', () => {
      const calendarEvent = new CalendarEventBuilder(
        $app.config,
        '1',
        '2020-12-01 10:00',
        '2020-12-01 11:00'
      )
        .withPeople(['Paul', 'John'])
        .build()
      renderComponent($app, calendarEvent)

      expect(
        document.querySelector('.sx__time-grid-event-people')
      ).not.toBeNull()
      expect(screen.queryByText('Paul & John')).toBeTruthy()
    })
  })
})

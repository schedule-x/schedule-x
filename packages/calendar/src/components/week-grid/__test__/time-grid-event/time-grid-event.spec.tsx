import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { AppContext } from '../../../../utils/stateful/app-context'
import { cleanup, render } from '@testing-library/preact'
import TimeGridEvent from '../../time-grid-event'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { afterEach } from 'vitest'

const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  return render(
    <AppContext.Provider value={$app}>
      <TimeGridEvent
        calendarEvent={calendarEvent}
        setMouseDown={() => undefined}
      />
    </AppContext.Provider>
  )
}

describe('TimeGridEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering the event', () => {
    it('should have a data-event-id attribute', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: '2020-01-01 00:00',
            end: '2020-01-02 01:00',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector('[data-event-id]')
      expect(timeGridEvent?.getAttribute('data-event-id')).toBe('123')
    })

    it('should add additional classes to the event', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: '2020-01-01 00:00',
            end: '2020-01-01 01:00',
            _options: {
              additionalClasses: ['event-class', 'another-class'],
            },
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector('.event-class')
      expect(timeGridEvent).not.toBeNull()
      const anotherClass = document.querySelector('.another-class')
      expect(anotherClass).not.toBeNull()
    })

    it('should not show the location by default', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: '2020-01-01 00:00',
            end: '2020-01-02 01:00',
            location: 'Location 1',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector(
        '.sx__time-grid-event-location'
      )
      expect(timeGridEvent).toBeNull()
    })

    it('should show the location if showLocation is true', () => {
      const $app = __createAppWithViews__({
        weekOptions: {
          showLocation: true,
        },
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: '2020-01-01 00:00',
            end: '2020-01-02 01:00',
            location: 'Location 1',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector(
        '.sx__time-grid-event-location'
      )
      expect(timeGridEvent).not.toBeNull()
    })
  })

  describe('rendering custom content', () => {
    it('should render custom markup but no default markup', () => {
      const $app = __createAppWithViews__({
        weekOptions: {
          showLocation: true,
        },
        events: [
          {
            id: '123',
            _customContent: {
              timeGrid: '<div class="custom-content">Custom Content</div>',
            },
            start: '2020-01-01 00:00',
            end: '2020-01-02 01:00',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const titleContent = document.querySelector('.sx__time-grid-event-title')
      expect(titleContent).toBeNull()
      const customContent = document.querySelector('.custom-content')
      expect(customContent).not.toBeNull()
    })
  })
})

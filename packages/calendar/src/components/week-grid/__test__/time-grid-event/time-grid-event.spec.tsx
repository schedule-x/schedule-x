import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { AppContext } from '../../../../utils/stateful/app-context'
import { cleanup, render } from '@testing-library/preact'
import TimeGridEvent from '../../time-grid-event'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  return render(
    <AppContext.Provider value={$app}>
      <TimeGridEvent
        calendarEvent={calendarEvent}
        setMouseDown={() => undefined}
        dayBoundariesDateTime={{
          start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
          end: Temporal.ZonedDateTime.from('2020-01-01T23:59:00[Europe/Stockholm]'),
        }}
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
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-02T01:00:00[Europe/Stockholm]'),
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
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00[Europe/Stockholm]'),
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

    it('should show start time and end time if they are different', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-01T01:00:00[Europe/Stockholm]'),
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const eventTime = document.querySelector('.sx__time-grid-event-time')
      expect(eventTime?.lastChild?.textContent).toStrictEqual(
        '11:00 PM – 12:00 AM'
      )
    })

    it('should only show start time if end time is the same', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: '1-minute event',
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const eventTime = document.querySelector('.sx__time-grid-event-time')
      expect(eventTime?.lastChild?.textContent).toStrictEqual('11:00 PM – 11:00 PM')
    })
  })

  describe('rendering custom content', () => {
    it('should render custom markup but no default markup', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            _customContent: {
              timeGrid: '<div class="custom-content">Custom Content</div>',
            },
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-02T01:00:00[Europe/Stockholm]'),
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

  describe('rendering new event with an animation', () => {
    it('should add the is-event-new class to the event', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            _customContent: {
              timeGrid: '<div class="custom-content">Custom Content</div>',
            },
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-02T01:00:00[Europe/Stockholm]'),
          },
        ],
      })
      const calendarEventInternal = $app.calendarEvents.list.value[0]
      calendarEventInternal._createdAt = new Date()
      renderComponent($app, calendarEventInternal)

      const timeGridEvent = document.querySelector('.sx__time-grid-event')
      expect(timeGridEvent?.classList.contains('is-event-new')).toBe(true)
    })

    it('should not add the is-event-new class to the event if the event is not new', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            _customContent: {
              timeGrid: '<div class="custom-content">Custom Content</div>',
            },
            start: Temporal.ZonedDateTime.from('2020-01-01T00:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2020-01-02T01:00:00[Europe/Stockholm]'),
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector('.sx__time-grid-event')
      expect(timeGridEvent?.classList.contains('is-event-new')).toBe(false)
    })
  })
})

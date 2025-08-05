import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, waitFor } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { renderComponent } from './utils'

describe('Week view', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a week with regular days', () => {
    it('renders one event at 12PM', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from('2021-01-01T12:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T18:00:00[Europe/Stockholm]'),
          },
        ],
      })
      renderComponent($app)

      const renderedEvent = document.querySelector('.sx__time-grid-event')
      expect(renderedEvent?.attributes.getNamedItem('style')?.value).toContain(
        'top: 45.83333333333333%'
      )
      expect(renderedEvent?.attributes.getNamedItem('style')?.value).toContain(
        'height: 25.000000000000014%'
      )
    })

    it.todo('renders a full day event')

    it('should render all events', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from('2021-01-01T12:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T18:00:00[Europe/Stockholm]'),
          },
          {
            id: 2,
            start: Temporal.ZonedDateTime.from('2021-01-01T14:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T16:00:00[Europe/Stockholm]'),
          },
        ],
      })
      renderComponent($app)

      const renderedEvents = document.querySelectorAll('.sx__time-grid-event')
      expect(renderedEvents.length).toBe(2)
    })

    it('should filter based on the filter predicate when rendering week', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from('2021-01-01T12:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T18:00:00[Europe/Stockholm]'),
            title: 'hello event',
          },
          {
            id: 2,
            start: Temporal.ZonedDateTime.from('2021-01-01T14:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T16:00:00[Europe/Stockholm]'),
            title: 'hello event 2',
          },
          {
            id: 3,
            start: Temporal.ZonedDateTime.from('2021-01-01T14:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T16:00:00[Europe/Stockholm]'),
            title: 'hello event',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = (event) =>
        event.title === 'hello event'
      renderComponent($app)

      const renderedEvents = document.querySelectorAll('.sx__time-grid-event')
      expect(renderedEvents.length).toBe(2)
      expect(renderedEvents[0].textContent).toContain('hello event')
      expect(renderedEvents[1].textContent).toContain('hello event')
    })

    it('should rerender week when filter predicate changes', async () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from('2021-01-01T12:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T18:00:00[Europe/Stockholm]'),
            title: 'hello event',
          },
          {
            id: 2,
            start: Temporal.ZonedDateTime.from('2021-01-01T14:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T16:00:00[Europe/Stockholm]'),
            title: 'hello event 2',
          },
          {
            id: 3,
            start: Temporal.ZonedDateTime.from('2021-01-01T14:00:00[Europe/Stockholm]'),
            end: Temporal.ZonedDateTime.from('2021-01-01T16:00:00[Europe/Stockholm]'),
            title: 'hello event',
          },
        ],
      })
      renderComponent($app)

      const renderedEvents = document.querySelectorAll('.sx__time-grid-event')
      expect(renderedEvents.length).toBe(3)

      $app.calendarEvents.filterPredicate.value = (event) =>
        event.title === 'hello event'

      await waitFor(() => {
        const renderedEventsAfterFilter = document.querySelectorAll(
          '.sx__time-grid-event'
        )
        expect(renderedEventsAfterFilter.length).toBe(2)
      })
    })
  })

  describe('a week with hybrid days', () => {
    it.todo('renders an event at 3AM')
  })

  describe('using the nDays option', () => {
    it.each([[1], [2], [3], [4], [5], [6], [7]])(
      'should render %s days',
      (nDays) => {
        const $app = __createAppWithViews__({
          selectedDate: Temporal.PlainDate.from('2021-01-01'),
          events: [],
          weekOptions: {
            nDays: nDays,
          },
        })
        renderComponent($app)

        const renderedDays = document.querySelectorAll('.sx__time-grid-day')
        expect(renderedDays.length).toBe(nDays)
      }
    )
  })

  describe('the is-selected class', () => {
    it('should have an is-selected class for the selected date', async () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2024-07-20'),
        events: [],
      })
      renderComponent($app)

      const selectedDay = document.querySelector(
        '.sx__time-grid-day.is-selected'
      )
      expect(selectedDay?.getAttribute('data-time-grid-date')).toBe(
        '2024-07-20'
      )

      $app.datePickerState.selectedDate.value = Temporal.PlainDate.from('2024-07-19')

      await waitFor(() => {
        const selectedDayAfterChange = document.querySelector(
          '.sx__time-grid-day.is-selected'
        )
        expect(
          selectedDayAfterChange?.getAttribute('data-time-grid-date')
        ).toBe('2024-07-19')
      })
    })
  })
})

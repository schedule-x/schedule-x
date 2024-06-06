/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/preact'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { MonthAgendaWrapper } from '../month-agenda-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import CalendarEventBuilder from '@schedule-x/shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { CalendarEventInternal } from '@schedule-x/shared'
import { vi } from 'vitest'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<MonthAgendaWrapper $app={$app} id={'1'} />)
}

const getDayN = (n: number) => {
  return document.querySelectorAll('.sx__month-agenda-day-name')[n]
}

describe('MonthAgendaWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a month for the current date', () => {
    it('should have one day with an active class', () => {
      renderComponent(__createAppWithViews__())

      expect(
        document.querySelectorAll('.sx__month-agenda-day--active')
      ).toHaveLength(1)
    })

    it('should display day names', () => {
      renderComponent(__createAppWithViews__())

      expect(
        document.querySelectorAll('.sx__month-agenda-day-name')
      ).toHaveLength(7)
      expect(getDayN(0).textContent).toBe('M')
      expect(getDayN(1).textContent).toBe('T')
      expect(getDayN(2).textContent).toBe('W')
      expect(getDayN(3).textContent).toBe('T')
      expect(getDayN(4).textContent).toBe('F')
      expect(getDayN(5).textContent).toBe('S')
      expect(getDayN(6).textContent).toBe('S')
    })
  })

  describe('a month for a date in the future', () => {
    it('should have one day with an active class', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      renderComponent($app)

      const activeDay = document.querySelector('.sx__month-agenda-day--active')
      expect(activeDay?.textContent).toContain('27')
    })

    it('should select a new day', async () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      renderComponent($app)

      fireEvent.click(screen.getAllByText('28')[1]) // first 28 is in December 2026, second is in January 2027

      await waitFor(() => {
        const activeDay = document.querySelector(
          '.sx__month-agenda-day--active'
        )
        expect(activeDay?.textContent).toContain('28')
      })
    })

    it('should call the onClickAgendaDate callback when selecting a day', () => {
      const onClickDateSpy = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onClickAgendaDate: onClickDateSpy,
        },
      })
      $app.datePickerState.selectedDate.value = '2027-01-27'
      renderComponent($app)

      fireEvent.click(screen.getAllByText('28')[1]) // first 28 is in December 2026, second is in January 2027

      expect(onClickDateSpy).toHaveBeenCalledWith('2027-01-28')
    })

    it('should display 5 weeks and 35 days', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-agenda-week')).toHaveLength(
        5
      )
      expect(document.querySelectorAll('.sx__month-agenda-day')).toHaveLength(
        35
      )
    })

    it('should display a new month when selecting a date in another month', async () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      renderComponent($app)
      expect(document.querySelectorAll('.sx__month-agenda-week')).toHaveLength(
        5
      )

      $app.datePickerState.selectedDate.value = '2027-02-27'

      await waitFor(() => {
        expect(
          document.querySelectorAll('.sx__month-agenda-week')
        ).toHaveLength(4)
      })
    })
  })

  describe('Reactively updating the list of events', () => {
    const AGENDA_EVENT = '.sx__month-agenda-event'

    it('should render the month view again when adding an event', async () => {
      const $app = __createAppWithViews__({
        selectedDate: '2027-01-27',
      })
      renderComponent($app)
      expect(document.querySelectorAll(AGENDA_EVENT)).toHaveLength(0)

      $app.calendarEvents.list.value = [
        new CalendarEventBuilder(
          $app.config,
          1,
          '2027-01-27',
          '2027-01-27'
        ).build(),
      ]

      await waitFor(() => {
        expect(document.querySelectorAll(AGENDA_EVENT)).toHaveLength(1)
      })
    })

    it('should render the month view again when removing an event', async () => {
      const $app = __createAppWithViews__({
        selectedDate: '2027-01-27',
        events: [
          {
            id: 1,
            start: '2027-01-27',
            end: '2027-01-27',
          },
        ],
      })
      renderComponent($app)
      expect(document.querySelectorAll(AGENDA_EVENT)).toHaveLength(1)

      $app.calendarEvents.list.value = []

      await waitFor(() => {
        expect(document.querySelectorAll(AGENDA_EVENT)).toHaveLength(0)
      })
    })
  })

  describe('using the events filter', () => {
    it('should display all events when there is no filter', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2027-01-27',
        events: [
          {
            id: 1,
            start: '2027-01-27',
            end: '2027-01-27',
          },
          {
            id: 2,
            start: '2027-01-27',
            end: '2027-01-27',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = () => true
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-agenda-event')).toHaveLength(
        2
      )
    })

    it('should display only the events that pass the filter', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2027-01-27',
        events: [
          {
            id: 1,
            title: 'display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
          {
            id: 2,
            title: 'do not display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
          {
            id: 3,
            title: 'display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = (
        event: CalendarEventInternal
      ) => event.title === 'display me'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-agenda-event')).toHaveLength(
        2
      )
    })

    it('should re-render the month agenda view when the filter changes', async () => {
      const $app = __createAppWithViews__({
        selectedDate: '2027-01-27',
        events: [
          {
            id: 1,
            title: 'display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
          {
            id: 2,
            title: 'do not display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
          {
            id: 3,
            title: 'display me',
            start: '2027-01-27',
            end: '2027-01-27',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = (
        event: CalendarEventInternal
      ) => event.title === 'display me'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-agenda-event')).toHaveLength(
        2
      )

      $app.calendarEvents.filterPredicate.value = () => true

      await waitFor(() => {
        expect(
          document.querySelectorAll('.sx__month-agenda-event')
        ).toHaveLength(3)
      })
    })
  })
})

import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render, waitFor } from '@testing-library/preact'
import { MonthGridWrapper } from '../month-grid-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { afterEach } from 'vitest'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<MonthGridWrapper $app={$app} id={'1'} />)
}

describe('MonthWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering weeks for a certain month', () => {
    it('should render 6 weeks for October 2023', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-grid-week').length).toBe(6)
    })
  })

  describe('rendering the current month', () => {
    it('should highlight the current date', () => {
      renderComponent(__createAppWithViews__())
      const todaysDate = new Date().getDate()

      expect(document.querySelector('.sx__is-today')?.textContent).toBe(
        todaysDate.toString()
      )
    })
  })

  describe('using the events filter predicate', () => {
    it('should not filter any events if the predicate is undefined', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-10-01',
        events: [
          {
            id: '1',
            start: '2023-10-01',
            end: '2023-10-01',
          },
          {
            id: '2',
            start: '2023-10-01',
            end: '2023-10-01',
          },
        ],
      })
      renderComponent($app)

      expect(document.querySelectorAll('.sx__event').length).toBe(2)
    })

    it('should filter events based on title', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-10-01',
        events: [
          {
            id: '1',
            start: '2023-10-01',
            end: '2023-10-01',
            title: 'event 1',
          },
          {
            id: '2',
            start: '2023-10-01',
            end: '2023-10-01',
            title: 'event 2',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = (event) =>
        event.title === 'event 1'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__event').length).toBe(1)
    })

    it('should re-render the month grid when the filter predicate changes', async () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-10-01',
        events: [
          {
            id: '1',
            start: '2023-10-01',
            end: '2023-10-01',
            title: 'event 1',
          },
          {
            id: '2',
            start: '2023-10-01',
            end: '2023-10-01',
            title: 'event 2',
          },
        ],
      })
      $app.calendarEvents.filterPredicate.value = (event) =>
        typeof event.title === 'string'
      renderComponent($app)
      expect(document.querySelectorAll('.sx__event').length).toBe(2)

      $app.calendarEvents.filterPredicate.value = (event) =>
        event.title === 'event 2'

      await waitFor(() => {
        expect(document.querySelectorAll('.sx__event').length).toBe(1)
      })
    })
  })
})

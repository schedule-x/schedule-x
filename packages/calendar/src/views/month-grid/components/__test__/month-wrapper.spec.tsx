import 'temporal-polyfill/global'
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
import 'temporal-polyfill/global'

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
      $app.datePickerState.selectedDate.value = Temporal.PlainDate.from('2023-10-01')
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
        selectedDate: Temporal.PlainDate.from('2023-10-01'),
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
          },
          {
            id: '2',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
          },
        ],
      })
      renderComponent($app)

      expect(document.querySelectorAll('.sx__event').length).toBe(2)
    })

    it('should filter events based on title', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2023-10-01'),
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
            title: 'event 1',
          },
          {
            id: '2',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
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
        selectedDate: Temporal.PlainDate.from('2023-10-01'),
        events: [
          {
            id: '1',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
            title: 'event 1',
          },
          {
            id: '2',
            start: Temporal.PlainDate.from('2023-10-01'),
            end: Temporal.PlainDate.from('2023-10-01'),
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

  describe('setting weekday classes', () => {
    const $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2020-01-01'),
    })

    it('should set weekday classes for all days of the month', () => {
      renderComponent($app)

      const days = document.querySelectorAll('.sx__month-grid-day')
      expect(days[0].classList).toContain('sx__monday')
      expect(days[1].classList).toContain('sx__tuesday')
      expect(days[2].classList).toContain('sx__wednesday')
      expect(days[3].classList).toContain('sx__thursday')
      expect(days[4].classList).toContain('sx__friday')
      expect(days[5].classList).toContain('sx__saturday')
      expect(days[6].classList).toContain('sx__sunday')

      expect(days[7].classList).toContain('sx__monday')
      expect(days[8].classList).toContain('sx__tuesday')
      expect(days[9].classList).toContain('sx__wednesday')
      expect(days[10].classList).toContain('sx__thursday')
      expect(days[11].classList).toContain('sx__friday')
      expect(days[12].classList).toContain('sx__saturday')
      expect(days[13].classList).toContain('sx__sunday')

      expect(days[14].classList).toContain('sx__monday')
      expect(days[15].classList).toContain('sx__tuesday')
      expect(days[16].classList).toContain('sx__wednesday')
      expect(days[17].classList).toContain('sx__thursday')
      expect(days[18].classList).toContain('sx__friday')
      expect(days[19].classList).toContain('sx__saturday')
      expect(days[20].classList).toContain('sx__sunday')

      expect(days[21].classList).toContain('sx__monday')
      expect(days[22].classList).toContain('sx__tuesday')
      expect(days[23].classList).toContain('sx__wednesday')
      expect(days[24].classList).toContain('sx__thursday')
      expect(days[25].classList).toContain('sx__friday')
      expect(days[26].classList).toContain('sx__saturday')
      expect(days[27].classList).toContain('sx__sunday')

      expect(days[28].classList).toContain('sx__monday')
      expect(days[29].classList).toContain('sx__tuesday')
      expect(days[30].classList).toContain('sx__wednesday')
      expect(days[31].classList).toContain('sx__thursday')
      expect(days[32].classList).toContain('sx__friday')
      expect(days[33].classList).toContain('sx__saturday')
      expect(days[34].classList).toContain('sx__sunday')
    })
  })

  describe('the selected class', () => {
    it('should add the selected class to the selected date', async () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2024-07-01'),
      })
      renderComponent($app)

      const selectedDay = document.querySelector(
        '.sx__month-grid-day.is-selected'
      )
      expect(selectedDay?.getAttribute('data-date')).toBe('2024-07-01')

      $app.datePickerState.selectedDate.value = Temporal.PlainDate.from('2024-07-02')

      await waitFor(() => {
        const selectedDay = document.querySelector(
          '.sx__month-grid-day.is-selected'
        )
        expect(selectedDay?.getAttribute('data-date')).toBe('2024-07-02')
      })
    })
  })

  describe('display of weeks numbers', () => {
    it('should display the week numbers if showWeekNumbers is configured', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2024-07-01'),
        showWeekNumbers: true,
      })
      renderComponent($app)

      expect(
        document.querySelectorAll('.sx__month-grid-week__week-number').length
      ).toBe(5)
    })

    it('should not display the week numbers if showWeekNumbers is not configured', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2024-07-01'),
        showWeekNumbers: false,
      })
      renderComponent($app)

      expect(
        document.querySelectorAll('.sx__month-grid-week__week-number').length
      ).toBe(0)
    })

    it('should show week numbers for a German calendar', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2025-03-13'),
        showWeekNumbers: true,
        firstDayOfWeek: 1,
      })
      renderComponent($app)

      const weekNumbers = document.querySelectorAll(
        '.sx__month-grid-week__week-number'
      )
      expect(weekNumbers[0].textContent).toBe('9')
      expect(weekNumbers[1].textContent).toBe('10')
      expect(weekNumbers[2].textContent).toBe('11')
      expect(weekNumbers[3].textContent).toBe('12')
      expect(weekNumbers[4].textContent).toBe('13')
      expect(weekNumbers[5].textContent).toBe('14')
    })
  })
})

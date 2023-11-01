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

const factory = ($app: CalendarAppSingleton) => {
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
      factory(__createAppWithViews__())

      expect(
        document.querySelectorAll('.sx__month-agenda-day--active')
      ).toHaveLength(1)
    })

    it('should display day names', () => {
      factory(__createAppWithViews__())

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
      factory($app)

      const activeDay = document.querySelector('.sx__month-agenda-day--active')
      expect(activeDay?.textContent).toContain('27')
    })

    it('should select a new day', async () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      factory($app)

      fireEvent.click(screen.getAllByText('28')[1]) // first 28 is in December 2026, second is in January 2027

      await waitFor(() => {
        const activeDay = document.querySelector(
          '.sx__month-agenda-day--active'
        )
        expect(activeDay?.textContent).toContain('28')
      })
    })

    it('should display 5 weeks and 35 days', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      factory($app)

      expect(document.querySelectorAll('.sx__month-agenda-week')).toHaveLength(
        5
      )
      expect(document.querySelectorAll('.sx__month-agenda-day')).toHaveLength(
        35
      )
    })

    it('should display a new month when selected date is in another month', async () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2027-01-27'
      factory($app)
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
})

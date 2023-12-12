import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import CalendarWrapper from '../calendar-wrapper'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { afterEach, vi, vitest } from 'vitest'
import { setNewDateAndPressEnter } from '@schedule-x/date-picker/src/components/__test__/app-input/utils'
import { openViewSelection } from '../../utils/stateless/testing/page-objects/view-selection'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<CalendarWrapper $app={$app} />)
}

const CALENDAR_WRAPPER_SELECTOR = '.sx__calendar-wrapper'
const SMALL_CALENDAR_CLASS = 'sx__is-calendar-small'

describe('CalendarWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when the calendar is small (less than 700px)', () => {
    it('should have an element class of sx__is-calendar-small', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)
      $app.calendarState.isCalendarSmall.value = true

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains(SMALL_CALENDAR_CLASS)
        ).toBe(true)
      })
    })
  })

  describe('when the calendar is not small (wider than 700px)', () => {
    it('should not have an element class of sx__is-calendar-small', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)
      $app.calendarState.isCalendarSmall.value = false

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains(SMALL_CALENDAR_CLASS)
        ).toBe(false)
      })
    })
  })

  describe('when dark mode is enabled', () => {
    it('should have an element class of is-dark', async () => {
      const $app = __createAppWithViews__({
        isDark: true,
      })
      renderComponent($app)

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains('is-dark')
        ).toBe(true)
      })
    })
  })

  describe('when light mode is enabled by default', () => {
    it('should not have an element class of is-dark', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains('is-dark')
        ).toBe(false)
      })
    })
  })

  describe('selecting a date in the date picker', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: '2023-12-01',
      })
      renderComponent($app)

      setNewDateAndPressEnter('2024-01-01')

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalled()
      })
    })
  })

  describe('changing from week to month view', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: '2023-12-01',
        defaultView: 'week',
      })
      renderComponent($app)

      openViewSelection()
      await waitFor(() => {
        screen.getByText('Month').click() // select month view
      })

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalled()
      })
    })
  })
})

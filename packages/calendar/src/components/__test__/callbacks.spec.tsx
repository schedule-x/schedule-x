import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setNewDateAndPressEnter } from '@schedule-x/date-picker/src/components/__test__/app-input/utils'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { openViewSelection } from '../../utils/stateless/testing/page-objects/view-selection'
import { renderComponent } from './utils'
import { createCalendarAppSingleton } from '../../factory'
import { viewMonthGrid } from '../../views/month-grid'
import { viewMonthAgenda } from '../../views/month-agenda'
import { viewDay } from '../../views/day'
import { viewWeek } from '../../views/week'

describe('CalendarWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('selecting a date in the date picker', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: '2023-12-01',
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      setNewDateAndPressEnter('2024-01-01')

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: '2024-01-01 00:00',
          end: '2024-02-04 23:59',
        })
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
        defaultView: InternalViewName.Week,
      })
      renderComponent($app)

      openViewSelection()
      await waitFor(() => {
        screen.getByText('Month').click() // select month view
      })

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: '2023-11-27 00:00',
          end: '2023-12-31 23:59',
        })
      })
    })
  })

  describe('Clicking an event', () => {
    it.each([
      InternalViewName.Week,
      InternalViewName.MonthGrid,
      InternalViewName.MonthAgenda,
      InternalViewName.Day,
    ])('should call the callback onEventClick in view %s', async (viewName) => {
      const onEventClick = vi.fn()
      const calendarEvent = {
        id: '1',
        start: '2023-12-01 00:00',
        end: '2023-12-01 23:59',
        title: 'Event 1',
      }
      const $app = createCalendarAppSingleton({
        views: [viewMonthGrid, viewMonthAgenda, viewDay, viewWeek],
        callbacks: {
          onEventClick,
        },
        selectedDate: '2023-12-01',
        defaultView: viewName,
        events: [calendarEvent],
      })

      renderComponent($app)

      await waitFor(() => {
        screen.getByText('Event 1').click()
      })

      await waitFor(() => {
        expect(onEventClick).toHaveBeenCalledTimes(1)

        expect(onEventClick).toHaveBeenCalledWith(calendarEvent)
      })
    })
  })
})

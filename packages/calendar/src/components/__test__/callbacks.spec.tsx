/* eslint-disable max-lines */
import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { setNewDateAndPressEnter } from '@schedule-x/date-picker/src/components/__test__/app-input/utils'
import { cleanup, fireEvent, waitFor } from '@testing-library/preact'
import { openViewSelection } from '../../utils/stateless/testing/page-objects/view-selection'
import { renderComponent } from './utils'
import { createCalendarAppSingleton } from '../../factory'
import { viewMonthGrid } from '../../views/month-grid'
import { viewMonthAgenda } from '../../views/month-agenda'
import { viewDay } from '../../views/day'
import { viewWeek } from '../../views/week'
import {
  clickByText,
  doubleClickByText,
} from '../../utils/stateless/testing/click-by-text'
import { assertIsDIV } from '../../../../../libs/assertions/src'

describe('Calendar callbacks', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Selecting a date in the date picker', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: Temporal.PlainDate.from('2023-12-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      setNewDateAndPressEnter('2024-01-01')

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: Temporal.ZonedDateTime.from('2024-01-01T00:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2024-02-04T23:59:00.000Z[UTC]'),
        })
      })
    })

    it('should call the callback onSelectedDateUpdate', async () => {
      const onSelectedDateUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onSelectedDateUpdate,
        },
        selectedDate: Temporal.PlainDate.from('2023-12-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      setNewDateAndPressEnter('2024-01-01')

      await waitFor(() => {
        expect(onSelectedDateUpdate).toHaveBeenCalledTimes(1)
        expect(onSelectedDateUpdate).toHaveBeenCalledWith(
          Temporal.PlainDate.from('2024-01-01')
        )
      })
    })
  })

  describe('Changing from week to month view', () => {
    it('should call the callback onRangeUpdate', async () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        callbacks: {
          onRangeUpdate,
        },
        selectedDate: Temporal.PlainDate.from('2023-12-01'),
        defaultView: InternalViewName.Week,
      })
      renderComponent($app)
      openViewSelection()

      await clickByText('Month') // select month view

      await waitFor(() => {
        expect(onRangeUpdate).toHaveBeenCalledTimes(1)

        expect(onRangeUpdate).toHaveBeenCalledWith({
          start: Temporal.ZonedDateTime.from('2023-11-27T00:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2023-12-31T23:59:00.000Z[UTC]'),
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
    ])('should call onEventClick in view %s', async (viewName) => {
      const onEventClick = vi.fn()
      const calendarEvent = {
        id: '1',
        start: Temporal.ZonedDateTime.from('2023-12-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-12-01T23:59:00.000Z[UTC]'),
        title: 'Event 1',
      }
      const uiEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
      const $app = createCalendarAppSingleton({
        views: [viewMonthGrid, viewMonthAgenda, viewDay, viewWeek],
        callbacks: {
          onEventClick,
        },
        selectedDate: Temporal.PlainDate.from('2023-12-01'),
        defaultView: viewName,
        events: [calendarEvent],
      })
      renderComponent($app)

      await clickByText('Event 1', uiEvent)

      await waitFor(() => {
        expect(onEventClick).toHaveBeenCalledTimes(1)

        expect(onEventClick).toHaveBeenCalledWith(calendarEvent, uiEvent)
      })
    })

    describe('Double clicking an event', () => {
      it.each([
        InternalViewName.Week,
        InternalViewName.MonthGrid,
        InternalViewName.MonthAgenda,
        InternalViewName.Day,
      ])('should call onDoubleClickEvent in view %s', async (viewName) => {
        const onDoubleClickEvent = vi.fn()
        const calendarEvent = {
          id: '1',
          start: Temporal.ZonedDateTime.from('2023-12-01T00:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2023-12-01T23:59:00.000Z[UTC]'),
          title: 'Event 1',
        }
        const uiEvent = new MouseEvent('dblclick', {
          bubbles: true,
          cancelable: true,
        })
        const $app = createCalendarAppSingleton({
          views: [viewMonthGrid, viewMonthAgenda, viewDay, viewWeek],
          callbacks: {
            onDoubleClickEvent,
          },
          selectedDate: Temporal.PlainDate.from('2023-12-01'),
          defaultView: viewName,
          events: [calendarEvent],
        })
        renderComponent($app)

        await doubleClickByText('Event 1', uiEvent)

        await waitFor(() => {
          expect(onDoubleClickEvent).toHaveBeenCalledTimes(1)

          expect(onDoubleClickEvent).toHaveBeenCalledWith(
            calendarEvent,
            uiEvent
          )
        })
      })
    })

    it('should not call onClickDate in month view', async () => {
      const onClickDate = vi.fn()
      const calendarEvent = {
        id: '1',
        start: Temporal.ZonedDateTime.from('2027-11-01T00:00:00.000Z[UTC]'),
        end: Temporal.ZonedDateTime.from('2027-11-01T23:59:00.000Z[UTC]'),
        title: 'Event 1',
      }
      const $app = createCalendarAppSingleton({
        views: [viewMonthGrid],
        callbacks: {
          onClickDate,
        },
        events: [calendarEvent],
        selectedDate: Temporal.PlainDate.from('2027-11-12'),
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      await clickByText('Event 1')

      expect(onClickDate).not.toHaveBeenCalled()
    })

    it.each([InternalViewName.Day, InternalViewName.Week])(
      'should not call onClickDateTime in view %s',
      async (viewName) => {
        const onClickDateTime = vi.fn()
        const calendarEvent = {
          id: '1',
          start: Temporal.ZonedDateTime.from('2023-12-01T00:00:00.000Z[UTC]'),
          end: Temporal.ZonedDateTime.from('2023-12-01T06:00:00.000Z[UTC]'),
          title: 'Event 1',
        }
        const $app = createCalendarAppSingleton({
          views: [viewDay, viewWeek],
          callbacks: {
            onClickDateTime,
          },
          events: [calendarEvent],
          selectedDate: Temporal.PlainDate.from('2023-12-01'),
          defaultView: viewName,
        })
        renderComponent($app)

        await clickByText('Event 1')

        expect(onClickDateTime).not.toHaveBeenCalled()
      }
    )
  })

  describe('Clicking a date in the month grid', () => {
    it('should call onClickDate', async () => {
      const onClickDate = vi.fn()
      const $app = createCalendarAppSingleton({
        views: [viewMonthGrid],
        callbacks: {
          onClickDate,
        },
        selectedDate: Temporal.PlainDate.from('2027-11-12'),
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      await waitFor(() => {
        const gridDayElement = document.querySelector('.sx__month-grid-day') // first day in grid
        assertIsDIV(gridDayElement)
        fireEvent(gridDayElement, new MouseEvent('click'))

        expect(onClickDate).toHaveBeenCalledTimes(1)
        expect(onClickDate).toHaveBeenCalledWith(
          Temporal.PlainDate.from('2027-11-01'),
          expect.any(UIEvent)
        )
      })
    })
  })

  describe('double clicking in a date in the month grid', () => {
    it('should call onDoubleClickDate', async () => {
      const onDoubleClickDate = vi.fn()
      const $app = createCalendarAppSingleton({
        views: [viewMonthGrid],
        callbacks: {
          onDoubleClickDate,
        },
        selectedDate: Temporal.PlainDate.from('2027-11-12'),
        defaultView: InternalViewName.MonthGrid,
      })
      renderComponent($app)

      await waitFor(() => {
        const gridDayElement = document.querySelector('.sx__month-grid-day') // first day in grid
        assertIsDIV(gridDayElement)
        fireEvent(gridDayElement, new MouseEvent('dblclick'))

        expect(onDoubleClickDate).toHaveBeenCalledTimes(1)
        expect(onDoubleClickDate).toHaveBeenCalledWith(
          Temporal.PlainDate.from('2027-11-01'),
          expect.any(UIEvent)
        )
      })
    })
  })

  describe('clicking in a day in the time grid', () => {
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 0,
          height: 2400,
        } as DOMRect
      }
    })

    it.each([InternalViewName.Day, InternalViewName.Week])(
      'should call onClickDateTime',
      async (view) => {
        const onClickDateTime = vi.fn()
        const $app = createCalendarAppSingleton({
          views: [viewDay, viewWeek],
          callbacks: {
            onClickDateTime,
          },
          selectedDate: Temporal.PlainDate.from('2023-12-11'),
          defaultView: view,
        })
        renderComponent($app)

        await waitFor(() => {
          // Click at the top of the day
          const gridDayElement = document.querySelector('.sx__time-grid-day') // first day in grid
          assertIsDIV(gridDayElement)
          fireEvent(gridDayElement, new MouseEvent('click'))

          expect(onClickDateTime).toHaveBeenCalledTimes(1)
          expect(onClickDateTime).toHaveBeenCalledWith(
            Temporal.ZonedDateTime.from('2023-12-11T00:00:00.000Z[UTC]'),
            expect.any(Object)
          )
        })
      }
    )
  })

  describe('double clicking in a day in the time grid', () => {
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 0,
          height: 2400,
        } as DOMRect
      }
    })

    it.each([InternalViewName.Day, InternalViewName.Week])(
      'should call onDoubleClickDateTime',
      async (view) => {
        const onDoubleClickDateTime = vi.fn()
        const $app = createCalendarAppSingleton({
          views: [viewDay, viewWeek],
          callbacks: {
            onDoubleClickDateTime,
          },
          selectedDate: Temporal.PlainDate.from('2023-12-11'),
          defaultView: view,
        })
        renderComponent($app)

        await waitFor(() => {
          // Click at the top of the day
          const gridDayElement = document.querySelector('.sx__time-grid-day') // first day in grid
          assertIsDIV(gridDayElement)
          fireEvent(gridDayElement, new MouseEvent('dblclick'))

          expect(onDoubleClickDateTime).toHaveBeenCalledTimes(1)
          expect(onDoubleClickDateTime).toHaveBeenCalledWith(
            Temporal.ZonedDateTime.from('2023-12-11T00:00:00.000Z[UTC]'),
            expect.any(UIEvent)
          )
        })
      }
    )
  })
})

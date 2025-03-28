import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import { viewMonthGrid } from '../views/month-grid'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'

describe('CustomHeaderContent', () => {
  describe('appending and prepending content to left part of header', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let prependFn = vi.fn()
    let appendFn = vi.fn()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2022-08-27',
        views: [viewMonthGrid],
        events: [],
      })
      prependFn = vi.fn()
      appendFn = vi.fn()
      calendarApp._setCustomComponentFn('headerContentLeftPrepend', prependFn)
      calendarApp._setCustomComponentFn('headerContentLeftAppend', appendFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(prependFn).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.any(Object)
        )
        expect(appendFn).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.any(Object)
        )
      })
    })
  })

  describe('appending and prepending content to right part of header', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let prependFn = vi.fn()
    let appendFn = vi.fn()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2022-08-27',
        views: [viewMonthGrid],
        events: [],
      })
      prependFn = vi.fn()
      appendFn = vi.fn()
      calendarApp._setCustomComponentFn('headerContentRightPrepend', prependFn)
      calendarApp._setCustomComponentFn('headerContentRightAppend', appendFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(prependFn).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.any(Object)
        )
        expect(appendFn).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.any(Object)
        )
      })
    })
  })
})

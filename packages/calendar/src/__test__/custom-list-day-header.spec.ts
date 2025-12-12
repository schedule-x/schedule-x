import 'temporal-polyfill/global'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { cleanup, waitFor } from '@testing-library/preact'
import CalendarApp from '../calendar.app'
import { spy } from 'sinon'
import { viewList } from '../views/list'
import { vi } from 'vitest'

describe('CalendarApp', () => {
  beforeEach(() => {
    window.IntersectionObserver = vi.fn().mockImplementation(() => {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      }
    })
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the list day header', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2022-08-27'),
        views: [viewList],
        events: [
          {
            id: '1',
            title: 'Event 1',
            start: Temporal.ZonedDateTime.from(
              '2022-08-27T10:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2022-08-27T11:00:00.00+00:00[UTC]'
            ),
          },
        ],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('listDayHeader', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function with date prop', async () => {
      await waitFor(() => {
        expect(customComponentFn.called).toBe(true)
        const calls = customComponentFn.getCalls()
        expect(calls.length).toBeGreaterThan(0)
        const firstCall = calls[0]
        const callFirstArgument = firstCall.args[0]
        const callSecondArgument = firstCall.args[1]
        expect(callFirstArgument).toBeInstanceOf(HTMLDivElement)
        expect(callSecondArgument.date).toBeDefined()
        expect(typeof callSecondArgument.date).toBe('string')
      })
    })

    it('should not render sx__list-day-header element when custom component is used', async () => {
      await waitFor(() => {
        const headerEl = calendarEl.querySelector('.sx__list-day-header')
        expect(headerEl).toBeFalsy()
        // Should have a div with data-ccid instead
        const customEl = calendarEl.querySelector(
          '[data-ccid^="custom-list-day-header-"]'
        )
        expect(customEl).toBeTruthy()
      })
    })
  })
})

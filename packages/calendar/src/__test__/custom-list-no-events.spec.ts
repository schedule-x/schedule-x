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

  describe('Using a custom component for the list no events message', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = spy()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: Temporal.PlainDate.from('2022-08-27'),
        views: [viewList],
        events: [],
      })
      customComponentFn = spy()
      calendarApp._setCustomComponentFn('listNoEvents', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function with the element and $app prop', async () => {
      await waitFor(() => {
        expect(customComponentFn.calledOnce).toBe(true)
        const singleCall = customComponentFn.getCalls()[0]
        const callFirstArgument = singleCall.args[0]
        const callSecondArgument = singleCall.args[1]
        expect(callFirstArgument).toBeInstanceOf(HTMLDivElement)
        expect(callSecondArgument.$app).toBeDefined()
      })
    })

    it('should not render sx__list-no-events element when custom component is used', async () => {
      await waitFor(() => {
        const noEventsEl = calendarEl.querySelector('.sx__list-no-events')
        expect(noEventsEl).toBeFalsy()
        // Should have a div with data-ccid instead
        const customEl = calendarEl.querySelector(
          '[data-ccid^="custom-list-no-events-"]'
        )
        expect(customEl).toBeTruthy()
      })
    })
  })
})

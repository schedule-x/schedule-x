import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { renderComponent } from './utils'
import { vi } from 'vitest'

const tab = () => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
}

const resizeObserver = class ResizeObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

window.ResizeObserver = resizeObserver

describe('Week view', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Navigating the date grid with keyboard', () => {
    const getAppWithOneFullDayEvent = (eventTitle: string) =>
      __createAppWithViews__({
        defaultView: InternalViewName.Week,
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from(
              '2021-01-01T00:00:00[Europe/Stockholm]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2021-01-01T23:59:59[Europe/Stockholm]'
            ),
            title: eventTitle,
          },
        ],
      })

    it('should focus a full day event', () => {
      const eventTitle = 'Full day event'
      const $app = getAppWithOneFullDayEvent(eventTitle)
      renderComponent($app)

      tab()

      const focusedEvent = document.activeElement
      expect(focusedEvent?.textContent).toContain(eventTitle)
    })

    it('should describe title and time in aria-label', () => {
      const eventTitle = 'Full day event'
      const $app = getAppWithOneFullDayEvent(eventTitle)
      renderComponent($app)

      const eventElement = document.querySelector('.sx__date-grid-event')
      expect(
        eventElement?.attributes.getNamedItem('aria-label')?.value
      ).toContain(eventTitle)
      expect(
        eventElement?.attributes.getNamedItem('aria-label')?.value
      ).toContain('January 1, 2021')
    })
  })

  describe('Navigating the time grid with keyboard', () => {
    const getAppWithOneTimeGridEvent = (eventTitle: string) =>
      __createAppWithViews__({
        defaultView: InternalViewName.Week,
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        events: [
          {
            id: 1,
            start: Temporal.ZonedDateTime.from(
              '2021-01-01T12:00:00[Europe/Stockholm]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2021-01-01T18:00:00[Europe/Stockholm]'
            ),
            title: eventTitle,
          },
        ],
      })

    it('should focus a time grid event', () => {
      const eventTitle = 'Time grid event'
      const $app = getAppWithOneTimeGridEvent(eventTitle)
      renderComponent($app)

      tab()

      const focusedEvent = document.activeElement
      expect(focusedEvent?.textContent).toContain(eventTitle)
      expect(focusedEvent?.textContent).toContain('11:00 AM')
    })
  })
})

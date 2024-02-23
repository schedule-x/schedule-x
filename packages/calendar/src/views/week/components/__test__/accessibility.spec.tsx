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

const tab = () => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
}

describe('Week view', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Navigating the date grid with keyboard', () => {
    const getAppWithOneFullDayEvent = (eventTitle: string) =>
      __createAppWithViews__({
        defaultView: InternalViewName.Week,
        selectedDate: '2021-01-01',
        events: [
          {
            id: 1,
            start: '2021-01-01',
            end: '2021-01-01',
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
      expect(eventElement?.attributes.getNamedItem('aria-label')?.value).toBe(
        eventTitle + ' January 1, 2021'
      )
    })
  })

  describe('Navigating the time grid with keyboard', () => {
    const getAppWithOneTimeGridEvent = (eventTitle: string) =>
      __createAppWithViews__({
        defaultView: InternalViewName.Week,
        selectedDate: '2021-01-01',
        events: [
          {
            id: 1,
            start: '2021-01-01 12:00',
            end: '2021-01-01 18:00',
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
      expect(focusedEvent?.textContent).toContain('12:00 PM – 6:00 PM')
    })
  })
})

import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createCurrentTimePlugin } from '../current-time-plugin.impl'
import { waitFor } from '@testing-library/preact'
import { assertIsDIV } from '../../../../libs/assertions/src'

describe('CurrentTimePlugin', () => {
  describe('Initializing the plugin when a week is displayed that is not now', () => {
    it('should not create a current time-indicator', async () => {
      const app = __createAppWithViews__()
      app.elements.calendarWrapper = document.createElement('div')
      const underTest = createCurrentTimePlugin()
      const existingIndicator = document.querySelector(
        '.sx__current-time-indicator'
      )
      expect(existingIndicator).toBeNull()
      underTest.onRender(app)

      const timeGridDayElement = document.createElement('div')
      timeGridDayElement.setAttribute('data-time-grid-date', '2024-01-01')
      app.elements.calendarWrapper.appendChild(timeGridDayElement)

      await waitFor(() => {
        expect(app.elements.calendarWrapper!.innerHTML).not.toEqual('')
      })

      const currentTimeIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      expect(currentTimeIndicator).toBeNull()
    })
  })

  describe('Initializing the plugin when a week is displayed that is now', () => {
    it('should create a current time-indicator', async () => {
      const app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })
      app.elements.calendarWrapper = document.createElement('div')
      const underTest = createCurrentTimePlugin()
      const existingIndicator = document.querySelector(
        '.sx__current-time-indicator'
      )
      expect(existingIndicator).toBeNull()
      underTest.onRender(app)

      const timeGridDayElement = document.createElement('div')
      timeGridDayElement.setAttribute(
        'data-time-grid-date',
        Temporal.Now.plainDateISO(app.config.timezone.value).toString()
      )
      app.elements.calendarWrapper.appendChild(timeGridDayElement)

      await waitFor(() => {
        expect(app.elements.calendarWrapper!.innerHTML).not.toEqual('')
      })

      const currentTimeIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      assertIsDIV(currentTimeIndicator)
      expect(currentTimeIndicator.style.top).toMatch(/^\d+(\.\d+)%$/)
    })
  })

  describe('reload method', () => {
    it('should remove existing indicator and create a new one', async () => {
      const app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })
      app.elements.calendarWrapper = document.createElement('div')
      const underTest = createCurrentTimePlugin()
      underTest.onRender(app)

      // Create today's date element
      const timeGridDayElement = document.createElement('div')
      timeGridDayElement.setAttribute(
        'data-time-grid-date',
        Temporal.Now.plainDateISO(app.config.timezone.value).toString()
      )
      app.elements.calendarWrapper.appendChild(timeGridDayElement)

      // Wait for initial indicator to be created
      await waitFor(() => {
        const indicator = app.elements.calendarWrapper?.querySelector(
          '.sx__current-time-indicator'
        )
        expect(indicator).not.toBeNull()
      })

      const initialIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      assertIsDIV(initialIndicator)

      // Call reload method
      underTest.reload()

      // Wait for the new indicator to be created
      await waitFor(() => {
        const newIndicator = app.elements.calendarWrapper?.querySelector(
          '.sx__current-time-indicator'
        )
        expect(newIndicator).not.toBeNull()
        // Verify it's a different element (not the same reference)
        expect(newIndicator).not.toBe(initialIndicator)
      })

      const newIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      assertIsDIV(newIndicator)
      expect(newIndicator.style.top).toMatch(/^\d+(\.\d+)%$/)
    })

    it('should handle reload when no indicator exists', async () => {
      const app = __createAppWithViews__({
        timezone: 'Europe/Berlin',
      })
      app.elements.calendarWrapper = document.createElement('div')
      const underTest = createCurrentTimePlugin()
      underTest.onRender(app)

      // Don't create today's date element, so no indicator should exist
      const initialIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      expect(initialIndicator).toBeNull()

      // Call reload method - should not throw an error
      expect(() => underTest.reload()).not.toThrow()

      // Still no indicator should exist since today's date element is not present
      const afterReloadIndicator = app.elements.calendarWrapper.querySelector(
        '.sx__current-time-indicator'
      )
      expect(afterReloadIndicator).toBeNull()
    })
  })
})

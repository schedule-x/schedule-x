import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createCurrentTimePlugin } from '../current-time-plugin.impl'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
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
      underTest.init(app)

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
      const app = __createAppWithViews__()
      app.elements.calendarWrapper = document.createElement('div')
      const underTest = createCurrentTimePlugin()
      const existingIndicator = document.querySelector(
        '.sx__current-time-indicator'
      )
      expect(existingIndicator).toBeNull()
      underTest.init(app)

      const timeGridDayElement = document.createElement('div')
      timeGridDayElement.setAttribute(
        'data-time-grid-date',
        toDateString(new Date())
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

  describe('initializing the plugin with a time zone offset', () => {
    it.each([
      [0],
      [60],
      [-60],
      [180],
      [-180],
      [840], // largest positive offset according to UTC
      [-720], // largest negative offset according to UTC
    ])('should initialize without error', (offset: number) => {
      expect(() =>
        createCurrentTimePlugin({ timeZoneOffset: offset })
      ).not.toThrow()
    })

    it.each([[841], [-721]])(
      'should throw when using erroneous offsets',
      (offset: number) => {
        expect(() =>
          createCurrentTimePlugin({ timeZoneOffset: offset })
        ).toThrow()
      }
    )
  })
})

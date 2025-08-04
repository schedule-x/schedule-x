import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getTimeGridDayWidth } from '../get-time-grid-day-width'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import 'temporal-polyfill/global'

describe('getTimeGridDayWidth', () => {
  describe('Getting the width in px of a day in the time grid', () => {
    it('should return the width in px of a day in the time grid', () => {
      const calendarWrapper = document.createElement('div')
      const timeGridDay = document.createElement('div')
      timeGridDay.classList.add('sx__time-grid-day')
      calendarWrapper.appendChild(timeGridDay)
      const $app = __createAppWithViews__()
      $app.elements.calendarWrapper = calendarWrapper
      const expectedDayWidth = 100
      Object.defineProperty(timeGridDay, 'clientWidth', {
        value: expectedDayWidth,
      })

      const dayWidth = getTimeGridDayWidth($app)

      expect(dayWidth).toBe(expectedDayWidth)
    })
  })

  describe('When there is no time grid day element', () => {
    it('should throw an error', () => {
      const calendarWrapper = document.createElement('div')
      const $app = __createAppWithViews__()
      $app.elements.calendarWrapper = calendarWrapper

      const getTimeGridDayWidthWithNoTimeGridDay = () =>
        getTimeGridDayWidth($app)

      expect(getTimeGridDayWidthWithNoTimeGridDay).toThrowError()
    })
  })
})

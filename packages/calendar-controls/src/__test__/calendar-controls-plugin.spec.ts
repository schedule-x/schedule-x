import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { createCalendarControlsPlugin } from '../calendar-controls-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

describe('createCalendarControlsPlugin', () => {
  describe('Setting the date', () => {
    it('should update the date', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
      })
      expect($app.datePickerState.selectedDate.value).toBe('2021-01-01')
      controlsPlugin.init($app)

      controlsPlugin.setDate('2021-02-02')

      expect($app.datePickerState.selectedDate.value).toBe('2021-02-02')
    })

    it('should throw if the date is invalid', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
      })
      expect($app.datePickerState.selectedDate.value).toBe('2021-01-01')
      controlsPlugin.init($app)

      expect(() => controlsPlugin.setDate('20210230T01:00:000Z')).toThrow(
        'Invalid date. Expected format YYYY-MM-DD'
      )
    })
  })

  describe('Setting the view', () => {
    it('should update the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.init($app)

      controlsPlugin.setView(InternalViewName.Day)

      expect($app.calendarState.view.value).toBe(InternalViewName.Day)
    })

    it('should update the range as a side effect of updating the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.init($app)
      expect($app.calendarState.range.value).toEqual({
        start: '2020-12-28 00:00',
        end: '2021-01-31 23:59',
      })

      controlsPlugin.setView(InternalViewName.Day)

      expect($app.calendarState.view.value).toBe(InternalViewName.Day)
      expect($app.calendarState.range.value).toEqual({
        start: '2021-01-01 00:00',
        end: '2021-01-01 23:59',
      })
    })

    it('should throw if the view name is not the name of a configured view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.init($app)

      expect(() => controlsPlugin.setView('NotAView')).toThrow(
        'Invalid view name. Expected one of day, week, month-grid'
      )
    })
  })

  describe('Getting the date', () => {
    it('should return the date', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
      })
      controlsPlugin.init($app)
      $app.datePickerState.selectedDate.value = '2023-01-01'

      expect(controlsPlugin.getDate()).toBe('2023-01-01')
    })
  })

  describe('Getting the view', () => {
    it('should return the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
        defaultView: InternalViewName.MonthGrid,
      })
      controlsPlugin.init($app)
      $app.calendarState.view.value = InternalViewName.Day

      expect(controlsPlugin.getView()).toBe(InternalViewName.Day)
    })
  })

  describe('Getting the range', () => {
    it('should return the range', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: '2021-01-01',
        defaultView: InternalViewName.MonthGrid,
      })
      controlsPlugin.init($app)
      $app.calendarState.range.value = {
        start: '2021-01-01 00:00',
        end: '2021-01-01 23:59',
      }

      expect(controlsPlugin.getRange()).toEqual({
        start: '2021-01-01 00:00',
        end: '2021-01-01 23:59',
      })
    })
  })
})

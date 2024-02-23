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
  })
})

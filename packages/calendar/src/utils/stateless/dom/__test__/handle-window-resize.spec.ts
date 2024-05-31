import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { stubInterface } from 'ts-sinon'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { viewDay } from '../../../../views/day'
import { viewMonthGrid } from '../../../../views/month-grid'
import { signal } from '@preact/signals'
import { vi } from 'vitest'
import { handleWindowResize } from '../handle-window-resize'

describe('handle window resize', () => {
  describe('when the calendar changes from large to small', () => {
    it('should set the view to day and update range', () => {
      const $app = stubInterface<CalendarAppSingleton>()
      $app.config = {
        ...stubInterface(),
        views: [viewDay, viewMonthGrid],
      }
      document.documentElement.style.fontSize = '16px'
      $app.calendarState = {
        ...stubInterface(),
        isCalendarSmall: signal(false),
        view: signal('month-grid'),
        setRange: vi.fn(),
      }
      $app.elements = {
        calendarWrapper: {
          ...stubInterface<HTMLDivElement>(),
          clientWidth: 699,
        },
      }
      $app.datePickerState = {
        ...stubInterface(),
        selectedDate: signal('2021-01-01'),
      }
      expect($app.calendarState.view.value).toBe('month-grid')

      handleWindowResize($app)

      expect($app.calendarState.view.value).toBe('day')
      expect($app.calendarState.setRange).toHaveBeenCalledWith(
        $app.datePickerState.selectedDate.value
      )
    })
  })
})

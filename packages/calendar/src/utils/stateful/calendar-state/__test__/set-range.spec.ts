import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendarState } from '../calendar-state.impl'
import CalendarConfigBuilder from '../../config/calendar-config.builder'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { viewWeek } from '../../../../views/week'
import { viewMonthGrid } from '../../../../views/month-grid'
import { viewDay } from '../../../../views/day'

describe('calendar state', () => {
  describe('setting the range in a non-hybrid day', () => {
    const config = new CalendarConfigBuilder().build()
    config.views.push(...[viewWeek, viewMonthGrid, viewDay])
    const timeUnitsImpl = new TimeUnitsBuilder().build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.Week

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-11 00:00',
        end: '2023-09-17 23:59',
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.MonthGrid

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-08-28 00:00',
        end: '2023-10-01 23:59',
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.Day

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-13 00:00',
        end: '2023-09-13 23:59',
      })
    })
  })

  describe('setting the range in a hybrid day', () => {
    const config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '08:00',
        end: '02:00',
      })
      .build()
    config.views.push(...[viewWeek, viewMonthGrid, viewDay])
    const timeUnitsImpl = new TimeUnitsBuilder().build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.Week

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-11 08:00',
        end: '2023-09-18 02:00',
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.MonthGrid

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-08-28 00:00',
        end: '2023-10-01 23:59',
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.view.value = InternalViewName.Day

      state.handleDateSelection('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-13 08:00',
        end: '2023-09-14 02:00',
      })
    })
  })
})

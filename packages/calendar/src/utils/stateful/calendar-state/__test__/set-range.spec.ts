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
import { createBaseConfig } from '../../../../__test__/utils'

describe('calendar state', () => {
  describe('setting the range in a non-hybrid day', () => {
    const config = new CalendarConfigBuilder().build()
    config.views.value.push(...[viewWeek, viewMonthGrid, viewDay])
    const timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.Week, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-11 00:00',
        end: '2023-09-18 00:00',
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.MonthGrid, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-08-28 00:00',
        end: '2023-10-01 23:59',
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.Day, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-13 00:00',
        end: '2023-09-14 00:00',
      })
    })

    it('should not update the range if both start and end remain the same', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.Day, '2023-09-13')
      state.range.value = {
        start: '2023-09-13 00:00',
        end: '2023-09-14 00:00',
      }
      const originalRange = state.range.value

      state.setRange('2023-09-13')

      expect(state.range.value).toBe(originalRange) // checking object equality is wanted here
    })
  })

  describe('setting the range in a hybrid day', () => {
    const config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '08:00',
        end: '02:00',
      })
      .build()
    config.views.value.push(...[viewWeek, viewMonthGrid, viewDay])
    const timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.Week, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-11 08:00',
        end: '2023-09-18 02:00',
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.MonthGrid, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-08-28 00:00',
        end: '2023-10-01 23:59',
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      state.setView(InternalViewName.Day, '2023-09-13')

      state.setRange('2023-09-13')

      expect(state.range.value).toEqual({
        start: '2023-09-13 08:00',
        end: '2023-09-14 02:00',
      })
    })
  })
})

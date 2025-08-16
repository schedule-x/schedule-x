import 'temporal-polyfill/global'
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
    config.timezone.value = 'UTC'
    config.views.value.push(...[viewWeek, viewMonthGrid, viewDay])
    const cfg = createBaseConfig()
    cfg.timezone.value = 'UTC'
    const timeUnitsImpl = new TimeUnitsBuilder().withConfig(cfg).build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.Week, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-17T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.MonthGrid, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-08-28T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-10-01T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.Day, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-09-13T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-13T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should not update the range if both start and end remain the same', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.Day, testDate)
      state.range.value = {
        start: Temporal.ZonedDateTime.from('2023-09-13T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-13T23:59:00.00+00:00[UTC]'),
      }
      const originalRange = state.range.value

      state.setRange(testDate)

      expect(state.range.value).toBe(originalRange) // checking object equality is wanted here
    })
  })

  describe('setting the range in a hybrid day', () => {
    const config = new CalendarConfigBuilder()
      .withDayBoundaries({
        start: '08:00',
        end: '02:00',
      })
      .withTimezone('UTC')
      .build()
    config.views.value.push(...[viewWeek, viewMonthGrid, viewDay])
    const cfg = createBaseConfig()
    cfg.timezone.value = 'UTC'
    const timeUnitsImpl = new TimeUnitsBuilder().withConfig(cfg).build()

    it('should set the range for the week', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.Week, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-09-11T08:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-18T02:00:00.00+00:00[UTC]'),
      })
    })

    it('should set the range for the month', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.MonthGrid, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-08-28T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-10-01T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should set the range for the day', () => {
      const state = createCalendarState(config, timeUnitsImpl)
      const testDate = Temporal.PlainDate.from('2023-09-13')
      state.setView(InternalViewName.Day, testDate)

      state.setRange(testDate)

      expect(state.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2023-09-13T08:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-14T02:00:00.00+00:00[UTC]'),
      })
    })
  })
})

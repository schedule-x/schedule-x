/* eslint-disable max-lines */

import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { createCalendarControlsPlugin } from '../calendar-controls-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { viewDay, viewMonthGrid, viewWeek } from '@schedule-x/calendar/src'
import { DayBoundariesExternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'
import {
  CalendarType,
  MonthGridOptions,
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { View } from '@schedule-x/shared/src'

describe('createCalendarControlsPlugin', () => {
  describe('Setting the date', () => {
    it('should update the date', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
      })
      expect($app.datePickerState.selectedDate.value).toEqual(
        Temporal.PlainDate.from('2021-01-01')
      )
      controlsPlugin.onRender($app)

      controlsPlugin.setDate(Temporal.PlainDate.from('2021-02-02'))

      expect($app.datePickerState.selectedDate.value).toEqual(
        Temporal.PlainDate.from('2021-02-02')
      )
    })

    it('should throw if the date is invalid', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
      })
      expect($app.datePickerState.selectedDate.value).toEqual(
        Temporal.PlainDate.from('2021-01-01')
      )
      controlsPlugin.onRender($app)

      // @ts-expect-error - we want to test the error case
      expect(() => controlsPlugin.setDate('20210230T01:00:000Z')).toThrow()
    })
  })

  describe('Setting the view', () => {
    it('should update the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.onRender($app)

      controlsPlugin.setView(InternalViewName.Day)

      expect($app.calendarState.view.value).toBe(InternalViewName.Day)
    })

    it('should update the range as a side effect of updating the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.onRender($app)
      expect($app.calendarState.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2020-12-28T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2021-01-31T23:59:00.00+00:00[UTC]'),
      })

      controlsPlugin.setView(InternalViewName.Day)

      expect($app.calendarState.view.value).toBe(InternalViewName.Day)
      expect($app.calendarState.range.value).toEqual({
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2021-01-01T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should throw if the view name is not the name of a configured view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      expect($app.calendarState.view.value).toBe(InternalViewName.MonthGrid)
      controlsPlugin.onRender($app)

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
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
      })
      controlsPlugin.onRender($app)
      $app.datePickerState.selectedDate.value =
        Temporal.PlainDate.from('2023-01-01')

      expect(controlsPlugin.getDate()).toEqual(
        Temporal.PlainDate.from('2023-01-01')
      )
    })
  })

  describe('Getting the view', () => {
    it('should return the view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      controlsPlugin.onRender($app)
      $app.calendarState.setView(
        InternalViewName.Day,
        Temporal.PlainDate.from('2021-01-01')
      )

      expect(controlsPlugin.getView()).toBe(InternalViewName.Day)
    })
  })

  describe('Getting the range', () => {
    it('should return the range', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.MonthGrid,
      })
      controlsPlugin.onRender($app)
      $app.calendarState.range.value = {
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2021-01-01T23:59:00.00+00:00[UTC]'),
      }

      expect(controlsPlugin.getRange()).toEqual({
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2021-01-01T23:59:00.00+00:00[UTC]'),
      })
    })
  })

  describe('Setting/Getting the first day of the week', () => {
    it('should return the first day of the week that was set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        firstDayOfWeek: WeekDay.MONDAY,
      })
      controlsPlugin.onRender($app)
      controlsPlugin.setFirstDayOfWeek(WeekDay.FRIDAY)

      expect(controlsPlugin.getFirstDayOfWeek()).toEqual(WeekDay.FRIDAY)
      expect($app.config.firstDayOfWeek.value).toEqual(WeekDay.FRIDAY)
    })
  })

  describe('Setting/Getting the locale', () => {
    it('should return the locale that was set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        locale: 'en-US',
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getLocale()).toEqual('en-US')

      controlsPlugin.setLocale('de-DE')
      expect(controlsPlugin.getLocale()).toEqual('de-DE')
      expect($app.config.locale.value).toEqual('de-DE')

      // The following expectation should work, however the translate function of $app does not use the locale signal of the config
      // expect($app.translate('Today')).toEqual('Heute')
    })
  })

  describe('Setting the views', () => {
    it('should throw an error if the views to be set to not contain the currently active view', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        views: [viewWeek],
      })
      controlsPlugin.onRender($app)

      expect(() => controlsPlugin.setViews([viewDay])).toThrow(
        `Currently active view is not in given views. Expected to find ${InternalViewName.Week} in ${viewDay.name}`
      )
    })
  })

  describe('Getting the views', () => {
    it('should return the views', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        views: [viewWeek],
      })
      controlsPlugin.onRender($app)

      const expectViewsAreEqual = (
        actualViews: View[],
        expectedViews: View[]
      ) => {
        expect(actualViews.map((view) => view.name)).toEqual(
          expectedViews.map((view) => view.name)
        )
      }

      expectViewsAreEqual(controlsPlugin.getViews(), [viewWeek])

      controlsPlugin.setViews([viewDay, viewWeek, viewMonthGrid])
      expectViewsAreEqual(controlsPlugin.getViews(), [
        viewDay,
        viewWeek,
        viewMonthGrid,
      ])
      expectViewsAreEqual($app.config.views.value, [
        viewDay,
        viewWeek,
        viewMonthGrid,
      ])
    })
  })

  describe('Setting/Getting the day boundaries', () => {
    it('should return the day boundaries that were set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialDayBoundaries: DayBoundariesExternal = {
        start: '08:00',
        end: '18:00',
      }
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        dayBoundaries: initialDayBoundaries,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getDayBoundaries()).toEqual(initialDayBoundaries)

      const newDayBoundaries: DayBoundariesExternal = {
        start: '10:00',
        end: '20:00',
      }
      controlsPlugin.setDayBoundaries(newDayBoundaries)
      expect(controlsPlugin.getDayBoundaries()).toEqual(newDayBoundaries)
      expect($app.config.dayBoundaries.value).toEqual({
        start: 1000,
        end: 2000,
      })
    })
  })

  describe('Setting/Getting the week options', () => {
    it('should return the week options that were set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialWeekOptions: WeekOptions = {
        nDays: 7,
        eventWidth: 100,
        gridHeight: 200,
        timeAxisFormatOptions: { hour: 'numeric' },
        eventOverlap: true,
      }
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        weekOptions: initialWeekOptions,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getWeekOptions()).toEqual(initialWeekOptions)

      const newWeekOptions: Partial<WeekOptions> = {
        nDays: 3,
        eventWidth: 200,
        gridHeight: 300,
        timeAxisFormatOptions: { hour: '2-digit' },
        eventOverlap: false,
      }
      controlsPlugin.setWeekOptions(newWeekOptions)
      expect(controlsPlugin.getWeekOptions()).toEqual(newWeekOptions)
      expect($app.config.weekOptions.value).toEqual(newWeekOptions)
    })

    it('should set a partial week options object', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialWeekOptions: WeekOptions = {
        nDays: 7,
        eventWidth: 100,
        gridHeight: 200,
        timeAxisFormatOptions: { hour: 'numeric' },
        eventOverlap: true,
      }
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        weekOptions: initialWeekOptions,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getWeekOptions()).toEqual(initialWeekOptions)

      const newWeekOptions: Partial<WeekOptions> = {
        nDays: 3,
        eventWidth: 200,
      }
      controlsPlugin.setWeekOptions(newWeekOptions)
      expect(controlsPlugin.getWeekOptions()).toEqual({
        nDays: 3,
        eventWidth: 200,
        gridHeight: 200,
        timeAxisFormatOptions: { hour: 'numeric' },
        eventOverlap: true,
      })
    })
  })

  describe('Setting/Getting the calendars', () => {
    it('should return the calendars that were set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialCalendars: Record<string, CalendarType> = {
        foo: {
          colorName: 'red',
          darkColors: {
            main: '#fff',
            container: '#fff',
            onContainer: '#fff',
          },
          label: 'foo',
          lightColors: {
            main: '#fff',
            container: '#fff',
            onContainer: '#fff',
          },
        },
      }
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        calendars: initialCalendars,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getCalendars()).toEqual(initialCalendars)

      const newCalendars: Record<string, CalendarType> = {
        bar: {
          colorName: 'blue',
          darkColors: {
            main: '#000',
            container: '#000',
            onContainer: '#000',
          },
          label: 'bar',
          lightColors: {
            main: '#000',
            container: '#000',
            onContainer: '#000',
          },
        },
      }
      controlsPlugin.setCalendars(newCalendars)
      expect(controlsPlugin.getCalendars()).toEqual(newCalendars)
      expect($app.config.calendars.value).toEqual(newCalendars)
    })
  })

  describe('Setting/Getting the min date', () => {
    it('should return the min date that was set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialMinDate = Temporal.PlainDate.from('2020-01-01')
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        minDate: initialMinDate,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getMinDate()).toEqual(initialMinDate)

      const newMinDate = Temporal.PlainDate.from('2020-02-02')
      controlsPlugin.setMinDate(newMinDate)
      expect(controlsPlugin.getMinDate()).toEqual(newMinDate)
      expect($app.config.minDate.value).toEqual(newMinDate)
    })
  })

  describe('Setting/Getting the max date', () => {
    it('should return the max date that was set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialMaxDate = Temporal.PlainDate.from('2022-01-01')
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        maxDate: initialMaxDate,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getMaxDate()).toEqual(initialMaxDate)

      const newMaxDate = Temporal.PlainDate.from('2022-02-02')
      controlsPlugin.setMaxDate(newMaxDate)
      expect(controlsPlugin.getMaxDate()).toEqual(newMaxDate)
      expect($app.config.maxDate.value).toEqual(newMaxDate)
    })
  })

  describe('Setting/Getting the month grid options', () => {
    it('should return the month grid options that were set', () => {
      const controlsPlugin = createCalendarControlsPlugin()
      const initialMonthGridOptions: MonthGridOptions = {
        nEventsPerDay: 4,
      }
      const $app = __createAppWithViews__({
        plugins: [controlsPlugin],
        selectedDate: Temporal.PlainDate.from('2021-01-01'),
        defaultView: InternalViewName.Week,
        monthGridOptions: initialMonthGridOptions,
      })
      controlsPlugin.onRender($app)

      expect(controlsPlugin.getMonthGridOptions()).toEqual(
        initialMonthGridOptions
      )

      const newMonthGridOptions: MonthGridOptions = {
        nEventsPerDay: 3,
      }
      controlsPlugin.setMonthGridOptions(newMonthGridOptions)
      expect(controlsPlugin.getMonthGridOptions()).toEqual(newMonthGridOptions)
      expect($app.config.monthGridOptions.value).toEqual(newMonthGridOptions)
    })
  })
})

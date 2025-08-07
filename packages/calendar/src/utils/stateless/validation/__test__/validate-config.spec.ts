import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { validateConfig } from '../validate-config'
import { CalendarConfigExternal } from '@schedule-x/shared/src'
import { DayBoundariesExternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'

describe('validating the config', () => {
  describe('validating the selected date', () => {
    it.each([
      [
        Temporal.ZonedDateTime.from('2022-01-01T00:00:00.000+00:00[UTC]'),
        '2022-01-01',
      ],
    ])(
      'should throw an error if the selected date is not a temporal plain date',
      (selectedDate: string | Temporal.ZonedDateTime) => {
        expect(() =>
          validateConfig({
            selectedDate: selectedDate as unknown,
          } as CalendarConfigExternal)
        ).toThrowError()
      }
    )

    it('should not throw an error if the selected date is a valid date string', () => {
      expect(() =>
        validateConfig({
          selectedDate: Temporal.PlainDate.from('2022-01-01'),
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })
  })

  describe('validating minDate and maxDate', () => {
    it.each([['2022-01-01T00:00:00.000Z'], ['2022-01-01 00:00:00']])(
      'should throw an error if the minDate is not a temporal plain date',
      (minDate: string) => {
        expect(() =>
          validateConfig({ minDate } as CalendarConfigExternal)
        ).toThrowError(
          '[Schedule-X error]: minDate must be a temporal plain date'
        )
      }
    )

    it.each([['2022-01-01T00:00:00.000Z'], ['2022-01-01 00:00:00']])(
      'should throw an error if the maxDate is not a temporal plain date',
      (maxDate: string) => {
        expect(() =>
          validateConfig({ maxDate } as CalendarConfigExternal)
        ).toThrowError(
          '[Schedule-X error]: maxDate must be a temporal plain date'
        )
      }
    )

    it('should not throw an error if the minDate is a temporal plain date', () => {
      expect(() =>
        validateConfig({
          minDate: Temporal.PlainDate.from('2022-01-01'),
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })

    it('should not throw an error if the maxDate is a temporal plain date', () => {
      expect(() =>
        validateConfig({
          maxDate: Temporal.PlainDate.from('2022-01-01'),
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })
  })

  describe('validating the first day of the week', () => {
    it.each([[-1], [7]])(
      `should throw an error if the first day of the week is not between 0 and 6`,
      (firstDayOfWeek: number) => {
        expect(() =>
          validateConfig({ firstDayOfWeek } as CalendarConfigExternal)
        ).toThrowError(
          '[Schedule-X error]: firstDayOfWeek must be a number between 0 and 6'
        )
      }
    )

    it.each([[0], [1], [2], [3], [4], [5], [6]])(
      `should not throw an error if the first day of the week is between 0 and 6`,
      (firstDayOfWeek: number) => {
        expect(() =>
          validateConfig({ firstDayOfWeek } as CalendarConfigExternal)
        ).not.toThrowError()
      }
    )
  })

  describe('validating the week options', () => {
    it('should throw an error on invalid gridHeight', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            gridHeight: -2,
          },
        } as CalendarConfigExternal)
      ).toThrowError(
        '[Schedule-X error]: weekOptions.gridHeight must be a positive number'
      )
    })

    it('should not throw an error on valid gridHeight', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            gridHeight: 2,
          },
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })

    it('should throw an error on negative nDays', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            nDays: -2,
          },
        } as CalendarConfigExternal)
      ).toThrowError(
        '[Schedule-X error]: weekOptions.nDays must be a number between 1 and 7'
      )
    })

    it('should throw an error on nDays more than 7', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            nDays: 8,
          },
        } as CalendarConfigExternal)
      ).toThrowError(
        '[Schedule-X error]: weekOptions.nDays must be a number between 1 and 7'
      )
    })

    it('should not throw an error on valid nDays', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            nDays: 2,
          },
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })

    it.each([[0], [101]])(
      'should throw an error for nDays less than 1 or more than 100',
      (eventWidth: number) => {
        expect(() =>
          validateConfig({
            weekOptions: {
              eventWidth,
            },
          } as CalendarConfigExternal)
        ).toThrowError(
          '[Schedule-X error]: weekOptions.eventWidth must be an integer between 1 and 100'
        )
      }
    )

    it('should not throw an error for valid eventWidth', () => {
      expect(() =>
        validateConfig({
          weekOptions: {
            eventWidth: 90,
          },
        } as CalendarConfigExternal)
      ).not.toThrowError()
    })
  })

  describe('validating the month options', () => {
    it('should not accept negative numbers for nEventsPerDay', () => {
      expect(() =>
        validateConfig({
          monthGridOptions: {
            nEventsPerDay: -2,
          },
        } as CalendarConfigExternal)
      ).toThrowError(
        '[Schedule-X error]: monthGridOptions.nEventsPerDay must be a positive number'
      )
    })
  })

  describe('validating the day boundaries', () => {
    it.each([
      [{ start: 0, end: 23 }],
      [{ start: '00:00', end: '23:59:59' }],
      [{ start: '00:00:00', end: '23:59:59' }],
      [{ start: '00:00:00', end: '23:59:59:999' }],
      [{ start: '0', end: '23' }],
      [{ start: '12:30', end: '17:00' }],
    ])(
      'should throw an error if the format of the day boundaries is not valid',
      // @ts-expect-error - This test is meant to test invalid types
      (dayBoundaries: DayBoundariesExternal) => {
        expect(() =>
          validateConfig({
            dayBoundaries,
          } as CalendarConfigExternal)
        ).toThrowError(
          '[Schedule-X error]: dayBoundaries must be an object with "start"- and "end" properties, each with the format HH:mm'
        )
      }
    )

    it.each([
      [{ start: '00:00', end: '23:00' }],
      [{ start: '22:00', end: '06:00' }],
    ])(
      'should not throw an error if the format of the day boundaries is valid',
      (dayBoundaries: DayBoundariesExternal) => {
        expect(() =>
          validateConfig({
            dayBoundaries,
          } as CalendarConfigExternal)
        ).not.toThrowError()
      }
    )
  })
})

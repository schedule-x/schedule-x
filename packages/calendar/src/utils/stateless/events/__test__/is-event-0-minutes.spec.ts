import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarEventInternal } from '@schedule-x/shared/src'
import { stubInterface } from 'ts-sinon'
import {
  areEvents0MinutesAndConcurrent,
  isEvent0Minutes,
} from '../is-event-0-minutes'

describe('isEvent0Minutes', () => {
  const e1: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
  }
  const e2: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2030-12-31T20:10:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2030-12-31T20:10:00.00+00:00[UTC]'),
  }

  it.each([e1, e2])(
    'should return true for timed events with the same start and end time',
    (e: CalendarEventInternal) => {
      expect(isEvent0Minutes(e)).toBe(true)
    }
  )

  const e3: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:06:00.00+00:00[UTC]'),
  }

  it('should return false for timed events with different start and end time', () => {
    expect(isEvent0Minutes(e3)).toBe(false)
  })

  it('should return false for untimed events', () => {
    const e4: CalendarEventInternal = {
      ...stubInterface<CalendarEventInternal>(),
      start: Temporal.ZonedDateTime.from('2023-02-17T00:00:00.00+00:00[UTC]'),
      end: Temporal.ZonedDateTime.from('2023-02-17T00:00:00.00+00:00[UTC]'),
    }
    expect(isEvent0Minutes(e4)).toBe(false)
  })
})

describe('areTwoEvents0MinutesAndConcurrent', () => {
  const e1: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
  }
  const e2: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
  }

  it('should return true for two events with the same start and end time', () => {
    expect(areEvents0MinutesAndConcurrent(e1, e2)).toBe(true)
  })

  const e3: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:06:00.00+00:00[UTC]'),
  }
  const e4: CalendarEventInternal = {
    ...stubInterface<CalendarEventInternal>(),
    start: Temporal.ZonedDateTime.from('2023-02-17T10:05:00.00+00:00[UTC]'),
    end: Temporal.ZonedDateTime.from('2023-02-17T10:06:00.00+00:00[UTC]'),
  }
  it('should return false for two events with different start and end time', () => {
    expect(areEvents0MinutesAndConcurrent(e1, e3)).toBe(false)
    expect(areEvents0MinutesAndConcurrent(e2, e4)).toBe(false)
  })
})

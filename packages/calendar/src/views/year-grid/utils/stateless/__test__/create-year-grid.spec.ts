import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { createYearGrid, positionEventsInYearGrid } from '../create-year-grid'

describe('createYearGrid', () => {
  it('creates all twelve months and every day in a leap year', () => {
    const year = createYearGrid(2024, 1)

    expect(year).toHaveLength(12)
    expect(year.flatMap((month) => month.days)).toHaveLength(366)
    expect(year[1].days).toHaveLength(29)
  })

  it('positions the first date relative to the configured first day of week', () => {
    expect(createYearGrid(2024, 1)[0].leadingDays).toBe(0)
    expect(createYearGrid(2024, 7)[0].leadingDays).toBe(1)
  })
})

describe('positionEventsInYearGrid', () => {
  it('clips events to the visible year and places them on every covered day', () => {
    const event = {
      id: 1,
      start: Temporal.PlainDate.from('2025-12-30'),
      end: Temporal.PlainDate.from('2026-01-02'),
    } as CalendarEventInternal
    const year = positionEventsInYearGrid(createYearGrid(2026, 1), [event])

    expect(year[0].days[0].events).toEqual([event])
    expect(year[0].days[1].events).toEqual([event])
    expect(year[0].days[2].events).toEqual([])
  })
})

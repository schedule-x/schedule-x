import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { signal } from '@preact/signals'
import CalendarConfigBuilder from '../../../../stateful/config/calendar-config.builder'
import { createTimeUnitsImpl } from '../../../factories/create-time-units-impl'
import { setRangeForYear } from '../set-range'

describe('setRangeForYear', () => {
  it('returns the complete selected year in the configured timezone', () => {
    const calendarConfig = new CalendarConfigBuilder()
      .withTimezone('Europe/Berlin')
      .build()
    const result = setRangeForYear({
      date: Temporal.PlainDate.from('2026-09-28'),
      calendarConfig,
      timeUnitsImpl: createTimeUnitsImpl(calendarConfig),
      range: signal(null),
    })

    expect(result.start.toString()).toBe(
      '2026-01-01T00:00:00+01:00[Europe/Berlin]'
    )
    expect(result.end.toString()).toBe(
      '2026-12-31T23:59:00+01:00[Europe/Berlin]'
    )
  })
})

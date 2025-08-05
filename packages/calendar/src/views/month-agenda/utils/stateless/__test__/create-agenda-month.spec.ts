import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createAgendaMonth } from '../create-agenda-month'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { MonthAgendaDay } from '../../../types/month-agenda'
import { createBaseConfig } from '../../../../../__test__/utils'
import 'temporal-polyfill/global'

const assertDate = (agendaMonthDate: MonthAgendaDay, expectedDate: string) => {
  expect(agendaMonthDate.date).toEqual(expectedDate)
  expect(agendaMonthDate.events.length).toBe(0)
}

describe('createAgendaMonth', () => {
  it('should create a month for 15th of December 2023', () => {
    const timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()
    const result = createAgendaMonth(Temporal.ZonedDateTime.from('2023-12-15T00:00:00+01:00[Europe/Berlin]'), timeUnitsImpl)

    expect(result.weeks.length).toBe(5)
    assertDate(result.weeks[0][0], '2023-11-27')
    assertDate(result.weeks[0][1], '2023-11-28')
    assertDate(result.weeks[0][2], '2023-11-29')
    assertDate(result.weeks[0][3], '2023-11-30')
    assertDate(result.weeks[0][4], '2023-12-01')
    assertDate(result.weeks[0][5], '2023-12-02')
    assertDate(result.weeks[0][6], '2023-12-03')

    assertDate(result.weeks[1][0], '2023-12-04')
    assertDate(result.weeks[1][1], '2023-12-05')
    assertDate(result.weeks[1][2], '2023-12-06')
    assertDate(result.weeks[1][3], '2023-12-07')
    assertDate(result.weeks[1][4], '2023-12-08')
    assertDate(result.weeks[1][5], '2023-12-09')
    assertDate(result.weeks[1][6], '2023-12-10')

    assertDate(result.weeks[2][0], '2023-12-11')
    assertDate(result.weeks[2][1], '2023-12-12')
    assertDate(result.weeks[2][2], '2023-12-13')
    assertDate(result.weeks[2][3], '2023-12-14')
    assertDate(result.weeks[2][4], '2023-12-15')
    assertDate(result.weeks[2][5], '2023-12-16')
    assertDate(result.weeks[2][6], '2023-12-17')

    assertDate(result.weeks[3][0], '2023-12-18')
    assertDate(result.weeks[3][1], '2023-12-19')
    assertDate(result.weeks[3][2], '2023-12-20')
    assertDate(result.weeks[3][3], '2023-12-21')
    assertDate(result.weeks[3][4], '2023-12-22')
    assertDate(result.weeks[3][5], '2023-12-23')
    assertDate(result.weeks[3][6], '2023-12-24')

    assertDate(result.weeks[4][0], '2023-12-25')
    assertDate(result.weeks[4][1], '2023-12-26')
    assertDate(result.weeks[4][2], '2023-12-27')
    assertDate(result.weeks[4][3], '2023-12-28')
    assertDate(result.weeks[4][4], '2023-12-29')
    assertDate(result.weeks[4][5], '2023-12-30')
    assertDate(result.weeks[4][6], '2023-12-31')
  })
})

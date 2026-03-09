import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createAgendaWeek } from '../create-agenda-week'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { AgendaDay } from '../../../types/month-agenda'
import { createBaseConfig } from '../../../../../__test__/utils'
import 'temporal-polyfill/global'

const assertDate = (agendaDay: AgendaDay, expectedDate: string) => {
  expect(agendaDay.date).toEqual(Temporal.PlainDate.from(expectedDate))
  expect(agendaDay.events.length).toBe(0)
}

describe('createAgendaWeek', () => {
  it('should create a single week for a Wednesday in December 2023', () => {
    const timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()
    const result = createAgendaWeek(
      Temporal.ZonedDateTime.from('2023-12-13T00:00:00+01:00[Europe/Berlin]'),
      timeUnitsImpl
    )

    expect(result.weeks.length).toBe(1)
    expect(result.weeks[0].length).toBe(7)
    assertDate(result.weeks[0][0], '2023-12-11')
    assertDate(result.weeks[0][1], '2023-12-12')
    assertDate(result.weeks[0][2], '2023-12-13')
    assertDate(result.weeks[0][3], '2023-12-14')
    assertDate(result.weeks[0][4], '2023-12-15')
    assertDate(result.weeks[0][5], '2023-12-16')
    assertDate(result.weeks[0][6], '2023-12-17')
  })

  it('should create a week from a PlainDate', () => {
    const timeUnitsImpl = new TimeUnitsBuilder()
      .withConfig(createBaseConfig())
      .build()
    const result = createAgendaWeek(
      Temporal.PlainDate.from('2023-12-13'),
      timeUnitsImpl
    )

    expect(result.weeks.length).toBe(1)
    expect(result.weeks[0].length).toBe(7)
    assertDate(result.weeks[0][0], '2023-12-11')
    assertDate(result.weeks[0][6], '2023-12-17')
  })
})

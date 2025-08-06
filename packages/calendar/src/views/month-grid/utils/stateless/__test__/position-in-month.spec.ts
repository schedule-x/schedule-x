import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createMonth } from '../create-month'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import CalendarEventBuilder from '../../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { positionInMonth } from '../position-in-month'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { createBaseConfig } from '../../../../../__test__/utils'

describe('Positioning events for in month view', () => {
  const $app = __createAppWithViews__()

  describe('Positioning single day events in first week', () => {
    const month = createMonth(
      Temporal.PlainDate.from('2020-01-01'),
      new TimeUnitsBuilder().withConfig(createBaseConfig()).build()
    )
    const event1 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2020-01-01'),
      Temporal.PlainDate.from('2020-01-01')
    ).build()
    const event2 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2020-01-01'),
      Temporal.PlainDate.from('2020-01-01')
    ).build()
    const sortedEvents = [event1, event2]

    it('should position two events on first two levels of 1st of January', () => {
      const result = positionInMonth(month, sortedEvents)

      expect(result[0][2].events[0]).toBe(event1)
      expect(result[0][2].events[1]).toBe(event2)
    })
  })

  describe('Positioning multi day events in first week', () => {
    const month = createMonth(
      Temporal.PlainDate.from('2020-01-01'),
      new TimeUnitsBuilder().withConfig(createBaseConfig()).build()
    )
    const event1 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2019-12-30'),
      Temporal.PlainDate.from('2020-01-01')
    ).build()
    const event2 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2020-01-01'),
      Temporal.PlainDate.from('2020-01-03')
    ).build()
    const sortedEvents = [event1, event2]

    it('should position event1 on 30th of December, 31st of December and 1st of January', () => {
      const result = positionInMonth(month, sortedEvents)

      expect(event1._eventFragments['2019-12-30']).toBe(3)
      expect(result[0][0].events[0]).toBe(event1)
      expect(result[0][1].events[0]).toBe('blocker')
      expect(result[0][2].events[0]).toBe('blocker')
    })

    it('should position event2 on 1st of January, 2nd of January and 3rd of January', () => {
      const result = positionInMonth(month, sortedEvents)

      expect(event2._eventFragments['2020-01-01']).toBe(3)
      expect(result[0][2].events[1]).toBe(event2)
      expect(result[0][3].events[1]).toBe('blocker')
      expect(result[0][4].events[1]).toBe('blocker')
    })
  })

  describe('Positioning a multi day event in every week of month, alongside other events', () => {
    const month = createMonth(
      Temporal.PlainDate.from('2020-01-01'),
      new TimeUnitsBuilder().withConfig(createBaseConfig()).build()
    )
    const event1 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2019-12-30'),
      Temporal.PlainDate.from('2020-01-28')
    ).build()
    const event2 = new CalendarEventBuilder(
      $app.config,
      1,
      Temporal.PlainDate.from('2020-01-28'),
      Temporal.PlainDate.from('2020-01-29')
    ).build()
    const sortedEvents = [event1, event2]

    it('should position an event in all weeks of month', () => {
      const result = positionInMonth(month, sortedEvents)

      expect(
        (result[0][0].events[0] as CalendarEventInternal)._eventFragments[
          '2019-12-30'
        ]
      ).toBe(7)
      expect(result[0][0].events[0]).toBe(event1) // Monday 30th of December
      expect(result[0][1].events[0]).toBe('blocker') // Tuesday 31st of December
      expect(result[0][2].events[0]).toBe('blocker') // Wednesday 1st of January
      expect(result[0][3].events[0]).toBe('blocker') // Thursday 2nd of January
      expect(result[0][4].events[0]).toBe('blocker') // Friday 3rd of January
      expect(result[0][5].events[0]).toBe('blocker') // Saturday 4th of January
      expect(result[0][6].events[0]).toBe('blocker') // Sunday 5th of January

      expect(
        (result[1][0].events[0] as CalendarEventInternal)._eventFragments[
          '2020-01-06'
        ]
      ).toBe(7)
      expect(result[1][0].events[0]).toBe(event1) // Monday 6th of January
      expect(result[1][1].events[0]).toBe('blocker') // Tuesday 7th of January
      expect(result[1][2].events[0]).toBe('blocker') // Wednesday 8th of January
      expect(result[1][3].events[0]).toBe('blocker') // Thursday 9th of January
      expect(result[1][4].events[0]).toBe('blocker') // Friday 10th of January
      expect(result[1][5].events[0]).toBe('blocker') // Saturday 11th of January
      expect(result[1][6].events[0]).toBe('blocker') // Sunday 12th of January

      expect(
        (result[2][0].events[0] as CalendarEventInternal)._eventFragments[
          '2020-01-13'
        ]
      ).toBe(7)
      expect(result[2][0].events[0]).toBe(event1) // Monday 13th of January
      expect(result[2][1].events[0]).toBe('blocker') // Tuesday 14th of January
      expect(result[2][2].events[0]).toBe('blocker') // Wednesday 15th of January
      expect(result[2][3].events[0]).toBe('blocker') // Thursday 16th of January
      expect(result[2][4].events[0]).toBe('blocker') // Friday 17th of January
      expect(result[2][5].events[0]).toBe('blocker') // Saturday 18th of January
      expect(result[2][6].events[0]).toBe('blocker') // Sunday 19th of January

      expect(
        (result[3][0].events[0] as CalendarEventInternal)._eventFragments[
          '2020-01-20'
        ]
      ).toBe(7)
      expect(result[3][0].events[0]).toBe(event1) // Monday 20th of January
      expect(result[3][1].events[0]).toBe('blocker') // Tuesday 21st of January
      expect(result[3][2].events[0]).toBe('blocker') // Wednesday 22nd of January
      expect(result[3][3].events[0]).toBe('blocker') // Thursday 23rd of January
      expect(result[3][4].events[0]).toBe('blocker') // Friday 24th of January
      expect(result[3][5].events[0]).toBe('blocker') // Saturday 25th of January
      expect(result[3][6].events[0]).toBe('blocker') // Sunday 26th of January

      expect(
        (result[4][0].events[0] as CalendarEventInternal)._eventFragments[
          '2020-01-27'
        ]
      ).toBe(2)
      expect(result[4][0].events[0]).toBe(event1) // Monday 27th of January
      expect(result[4][1].events[0]).toBe('blocker') // Tuesday 28th of January
      expect(result[4][2].events[0]).toBe(undefined) // Wednesday 29th of January
      expect(result[4][3].events[0]).toBe(undefined) // Thursday 30th of January
      expect(result[4][4].events[0]).toBe(undefined) // Friday 31st of January
      expect(result[4][5].events[0]).toBe(undefined) // Saturday 1st of February
      expect(result[4][6].events[0]).toBe(undefined) // Sunday 2nd of February
    })

    it('should position an event in the last week of month', () => {
      const result = positionInMonth(month, sortedEvents)

      expect(
        (result[4][1].events[1] as CalendarEventInternal)._eventFragments[
          '2020-01-28'
        ]
      ).toBe(2)
      expect(result[4][1].events[1]).toBe(event2) // Tuesday 28th of January
      expect(result[4][2].events[1]).toBe('blocker') // Wednesday 29th of January
      expect(result[4][3].events[1]).toBe(undefined) // Thursday 30th of January
      expect(result[4][4].events[1]).toBe(undefined) // Friday 31st of January
      expect(result[4][5].events[1]).toBe(undefined) // Saturday 1st of February
      expect(result[4][6].events[1]).toBe(undefined) // Sunday 2nd of February
    })
  })
})

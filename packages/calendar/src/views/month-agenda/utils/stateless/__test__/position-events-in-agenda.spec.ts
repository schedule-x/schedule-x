import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createAgendaMonth } from '../create-agenda-month'
import { positionEventsInAgenda } from '../position-events-in-agenda'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'

describe('Positioning events in a month agenda', () => {
  describe('One event stretching 10 days', () => {
    const eventId = 1
    const $app = __createAppWithViews__({
      events: [
        {
          id: eventId,
          start: Temporal.PlainDate.from('2023-11-01'),
          end: Temporal.PlainDate.from('2023-11-10'),
        },
      ],
    })
    const agendaMonth = createAgendaMonth(
      Temporal.PlainDate.from('2023-11-01'),
      $app.timeUnitsImpl
    )

    it('should position event in all 10 days', () => {
      const result = positionEventsInAgenda(
        agendaMonth,
        $app.calendarEvents.list.value
      )

      expect(result.weeks[0][0].events).toHaveLength(0) // 30th Oct 2023
      expect(result.weeks[0][1].events).toHaveLength(0) // 31st Oct 2023
      expect(result.weeks[0][2].events[0].id).toBe(eventId) // 1st Nov 2023
      expect(result.weeks[0][3].events[0].id).toBe(eventId) // 2nd Nov 2023
      expect(result.weeks[0][4].events[0].id).toBe(eventId) // 3rd Nov 2023
      expect(result.weeks[0][5].events[0].id).toBe(eventId) // 4th Nov 2023
      expect(result.weeks[0][6].events[0].id).toBe(eventId) // 5th Nov 2023

      expect(result.weeks[1][0].events[0].id).toBe(eventId) // 6th Nov 2023
      expect(result.weeks[1][1].events[0].id).toBe(eventId) // 7th Nov 2023
      expect(result.weeks[1][2].events[0].id).toBe(eventId) // 8th Nov 2023
      expect(result.weeks[1][3].events[0].id).toBe(eventId) // 9th Nov 2023
      expect(result.weeks[1][4].events[0].id).toBe(eventId) // 10th Nov 2023

      expect(result.weeks[1][5].events).toHaveLength(0) // 11th Nov 2023
    })
  })

  describe('Three events', () => {
    const eventId1 = 1
    const eventId2 = 2
    const eventId3 = 3
    const $app = __createAppWithViews__({
      events: [
        {
          id: eventId1,
          start: Temporal.PlainDate.from('2023-11-01'),
          end: Temporal.PlainDate.from('2023-11-10'),
        },
        {
          id: eventId2,
          start: Temporal.PlainDate.from('2023-11-01'),
          end: Temporal.PlainDate.from('2023-11-05'),
        },
        {
          id: eventId3,
          start: Temporal.PlainDate.from('2023-11-05'),
          end: Temporal.PlainDate.from('2023-11-10'),
        },
      ],
    })
    const agendaMonth = createAgendaMonth(
      Temporal.ZonedDateTime.from('2023-11-01T00:00:00.00+00:00[UTC]'),
      $app.timeUnitsImpl
    )

    it('should position events in all days', () => {
      const result = positionEventsInAgenda(
        agendaMonth,
        $app.calendarEvents.list.value
      )

      expect(result.weeks[0][0].events).toHaveLength(0) // 30th Oct 2023
      expect(result.weeks[0][1].events).toHaveLength(0) // 31st Oct 2023

      // event 1
      expect(result.weeks[0][2].events[0].id).toBe(eventId1) // 1st Nov 2023
      expect(result.weeks[0][3].events[0].id).toBe(eventId1) // 2nd Nov 2023
      expect(result.weeks[0][4].events[0].id).toBe(eventId1) // 3rd Nov 2023
      expect(result.weeks[0][5].events[0].id).toBe(eventId1) // 4th Nov 2023
      expect(result.weeks[0][6].events[0].id).toBe(eventId1) // 5th Nov 2023
      expect(result.weeks[1][0].events[0].id).toBe(eventId1) // 6th Nov 2023
      expect(result.weeks[1][1].events[0].id).toBe(eventId1) // 7th Nov 2023
      expect(result.weeks[1][2].events[0].id).toBe(eventId1) // 8th Nov 2023
      expect(result.weeks[1][3].events[0].id).toBe(eventId1) // 9th Nov 2023
      expect(result.weeks[1][4].events[0].id).toBe(eventId1) // 10th Nov 2023

      // Event 2
      expect(result.weeks[0][2].events[1].id).toBe(eventId2) // 1st Nov 2023
      expect(result.weeks[0][3].events[1].id).toBe(eventId2) // 2nd Nov 2023
      expect(result.weeks[0][4].events[1].id).toBe(eventId2) // 3rd Nov 2023
      expect(result.weeks[0][5].events[1].id).toBe(eventId2) // 4th Nov 2023
      expect(result.weeks[0][6].events[1].id).toBe(eventId2) // 5th Nov 2023

      // Event 3
      expect(result.weeks[0][6].events[2].id).toBe(eventId3) // 5th Nov 2023
      expect(result.weeks[1][0].events[1].id).toBe(eventId3) // 6th Nov 2023
      expect(result.weeks[1][1].events[1].id).toBe(eventId3) // 7th Nov 2023
      expect(result.weeks[1][2].events[1].id).toBe(eventId3) // 8th Nov 2023
      expect(result.weeks[1][3].events[1].id).toBe(eventId3) // 9th Nov 2023
      expect(result.weeks[1][4].events[1].id).toBe(eventId3) // 10th Nov 2023

      expect(result.weeks[1][5].events).toHaveLength(0) // 11th Nov 2023
    })
  })
})

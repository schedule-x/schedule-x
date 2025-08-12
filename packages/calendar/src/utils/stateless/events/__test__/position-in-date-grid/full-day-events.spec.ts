import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createWeek } from '../../../views/week/create-week'
import CalendarEventBuilder from '../../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { positionInDateGrid } from '../../position-in-date-grid'
import { DATE_GRID_BLOCKER } from '../../../../../constants'
import { __createAppWithViews__ } from '../../../testing/__create-app-with-views__'

describe('positioning events in the date grid of a week or day', () => {
  describe('positioning full day events', () => {
    const selectedDate = Temporal.PlainDate.from('2023-09-17')
    const $app = __createAppWithViews__({
      selectedDate,
      timezone: 'Europe/Moscow',
    })

    it('should position an event, stretching from the first until last day of the week', () => {
      const dateGridEvents = [
        new CalendarEventBuilder(
          $app.config,
          1,
          Temporal.PlainDate.from('2023-09-11'),
          Temporal.PlainDate.from('2023-09-17')
        ).build(),
      ]
      const week = createWeek($app)

      const weekWithEvents = positionInDateGrid(dateGridEvents, week)

      expect(weekWithEvents['2023-09-11'].dateGridEvents[0]).toEqual(
        dateGridEvents[0]
      )
      expect(weekWithEvents['2023-09-12'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-13'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-14'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-15'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-16'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-17'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
    })

    it('should position a single full day event', () => {
      const dateGridEvents = [
        new CalendarEventBuilder(
          $app.config,
          1,
          Temporal.PlainDate.from('2023-09-16'),
          Temporal.PlainDate.from('2023-09-16')
        ).build(),
      ]
      const week = createWeek($app)

      const weekWithEvents = positionInDateGrid(dateGridEvents, week)

      expect(weekWithEvents['2023-09-11'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-12'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-13'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-14'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-15'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-16'].dateGridEvents[0]).toEqual(
        dateGridEvents[0]
      )
      expect(weekWithEvents['2023-09-17'].dateGridEvents[0]).toBeUndefined()
    })

    it('should position three two day events', () => {
      const dateGridEvents = [
        new CalendarEventBuilder(
          $app.config,
          1,
          Temporal.PlainDate.from('2023-09-12'),
          Temporal.PlainDate.from('2023-09-13')
        ).build(),
        new CalendarEventBuilder(
          $app.config,
          2,
          Temporal.PlainDate.from('2023-09-13'),
          Temporal.PlainDate.from('2023-09-14')
        ).build(),
        new CalendarEventBuilder(
          $app.config,
          3,
          Temporal.PlainDate.from('2023-09-14'),
          Temporal.PlainDate.from('2023-09-15')
        ).build(),
      ]
      const week = createWeek($app)

      const weekWithEvents = positionInDateGrid(dateGridEvents, week)

      // Monday
      expect(weekWithEvents['2023-09-11'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-11'].dateGridEvents[1]).toBeUndefined()

      // Tuesday
      expect(weekWithEvents['2023-09-12'].dateGridEvents[0]).toEqual(
        dateGridEvents[0]
      )
      expect(weekWithEvents['2023-09-12'].dateGridEvents[1]).toBeUndefined()

      // Wednesday
      expect(weekWithEvents['2023-09-13'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-13'].dateGridEvents[1]).toEqual(
        dateGridEvents[1]
      )

      // Thursday
      expect(weekWithEvents['2023-09-14'].dateGridEvents[0]).toEqual(
        dateGridEvents[2]
      )
      expect(weekWithEvents['2023-09-14'].dateGridEvents[1]).toEqual(
        DATE_GRID_BLOCKER
      )

      // Friday
      expect(weekWithEvents['2023-09-15'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-15'].dateGridEvents[1]).toBeUndefined()

      // Saturday
      expect(weekWithEvents['2023-09-16'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-16'].dateGridEvents[1]).toBeUndefined()

      // Sunday
      expect(weekWithEvents['2023-09-17'].dateGridEvents[0]).toBeUndefined()
      expect(weekWithEvents['2023-09-17'].dateGridEvents[1]).toBeUndefined()
    })

    it('should position events that start before the week and end after the week', () => {
      const dateGridEvents = [
        new CalendarEventBuilder(
          $app.config,
          1,
          Temporal.PlainDate.from('2023-09-09'),
          Temporal.PlainDate.from('2023-09-19')
        ).build(),
        new CalendarEventBuilder(
          $app.config,
          2,
          Temporal.PlainDate.from('2023-09-10'),
          Temporal.PlainDate.from('2023-09-11')
        ).build(),
        new CalendarEventBuilder(
          $app.config,
          3,
          Temporal.PlainDate.from('2023-09-16'),
          Temporal.PlainDate.from('2023-09-17')
        ).build(),
        new CalendarEventBuilder(
          $app.config,
          4,
          Temporal.PlainDate.from('2023-09-17'),
          Temporal.PlainDate.from('2023-09-18')
        ).build(),
      ]
      const week = createWeek($app)
      const eventWithId = (id: number) =>
        dateGridEvents.find((e) => e.id === id)

      const weekWithEvents = positionInDateGrid(dateGridEvents, week)

      // Monday
      expect(weekWithEvents['2023-09-11'].dateGridEvents[0]).toEqual(
        eventWithId(1)
      )
      expect(weekWithEvents['2023-09-11'].dateGridEvents[1]).toEqual(
        eventWithId(2)
      )

      // Tuesday
      expect(weekWithEvents['2023-09-12'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-12'].dateGridEvents[1]).toBeUndefined()

      // Wednesday
      expect(weekWithEvents['2023-09-13'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-13'].dateGridEvents[1]).toBeUndefined()

      // Thursday
      expect(weekWithEvents['2023-09-14'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-14'].dateGridEvents[1]).toBeUndefined()

      // Friday
      expect(weekWithEvents['2023-09-15'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-15'].dateGridEvents[1]).toBeUndefined()

      // Saturday
      expect(weekWithEvents['2023-09-16'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-16'].dateGridEvents[1]).toEqual(
        eventWithId(3)
      )

      // Sunday
      expect(weekWithEvents['2023-09-17'].dateGridEvents[0]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-17'].dateGridEvents[1]).toEqual(
        DATE_GRID_BLOCKER
      )
      expect(weekWithEvents['2023-09-17'].dateGridEvents[2]).toEqual(
        eventWithId(4)
      )
    })
  })
})

import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { createWeek } from '../../../views/week/create-week'
import { positionInDateGrid } from '../../position-in-date-grid'
import { DATE_GRID_BLOCKER } from '../../../../../constants'
import { __createAppWithViews__ } from '../../../testing/__create-app-with-views__'

describe('positioning events in the date grid of a week or day', () => {
  describe('positioning timed events', () => {
    const selectedDate = Temporal.PlainDate.from('2023-09-17')
    const $app = __createAppWithViews__({
      selectedDate,
      timezone: 'Europe/Moscow',
    })

    it('should position an event that spans from before the first day until after the last', () => {
      const dateGridEvents = [
        new CalendarEventBuilder(
          $app.config,
          1,
          Temporal.ZonedDateTime.from('2023-09-10T04:00:00+03:00[Europe/Moscow]'),
          Temporal.ZonedDateTime.from('2023-09-20T20:00:00+03:00[Europe/Moscow]')
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
  })
})

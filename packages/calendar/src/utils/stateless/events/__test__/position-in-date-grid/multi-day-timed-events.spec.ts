import {
  describe,
  expect,
  it,
} from '../../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendarAppSingleton } from '../../../../../factory'
import CalendarEventBuilder from '../../../../stateful/calendar-event/calendar-event.builder'
import { getWeekDayContexts } from '../../../views/week/get-week-day-contexts'
import { positionInDateGrid } from '../../position-in-date-grid'

describe('positioning events in the date grid of a week or day', () => {
  describe('positioning timed events', () => {
    const selectedDate = '2023-09-17'
    const $app = createCalendarAppSingleton({
      datePicker: {
        selectedDate: selectedDate,
      },
    })

    it('should position an event that spans from before the first day until after the last', () => {
      const dateGridEvents = [
        new CalendarEventBuilder($app.config, 1, {
          start: '2023-09-10 04:00',
          end: '2023-09-20 20:00',
        }).build(),
      ]
      const weekDayContexts = getWeekDayContexts($app)

      const contexts = positionInDateGrid(dateGridEvents, weekDayContexts)

      expect(contexts['2023-09-11'].dateGridEvents[0]).toEqual(
        dateGridEvents[0]
      )
      expect(contexts['2023-09-12'].dateGridEvents[0]).toEqual('blocker')
      expect(contexts['2023-09-13'].dateGridEvents[0]).toEqual('blocker')
      expect(contexts['2023-09-14'].dateGridEvents[0]).toEqual('blocker')
      expect(contexts['2023-09-15'].dateGridEvents[0]).toEqual('blocker')
      expect(contexts['2023-09-16'].dateGridEvents[0]).toEqual('blocker')
      expect(contexts['2023-09-17'].dateGridEvents[0]).toEqual('blocker')
    })
  })
})

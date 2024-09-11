/* eslint-disable max-lines */
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import { positionInTimeGrid } from '../position-in-time-grid'
import { __createAppWithViews__ } from '../../testing/__create-app-with-views__'

describe('Position in time grid', () => {
  const _config = new CalendarConfigBuilder().build()
  const createEvent = (event: { start: string; end: string; id: string }) => {
    return new CalendarEventBuilder(
      _config,
      event.id,
      event.start,
      event.end
    ).build()
  }

  const selectedDate = '2020-01-01'
  const $app = __createAppWithViews__({
    selectedDate,
  })

  it('should not add time grid events if date event date does not exist in given week', () => {
    const timeEvent1 = {
      start: '2020-01-01 00:00',
      end: '2020-01-01 01:00',
      id: '1',
    }
    const event1 = createEvent(timeEvent1)

    const week = {}
    const result = positionInTimeGrid([event1], week, $app)

    expect(result).toEqual({})
  })
})

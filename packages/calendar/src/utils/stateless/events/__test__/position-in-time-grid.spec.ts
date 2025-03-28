import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import CalendarConfigBuilder from '../../../stateful/config/calendar-config.builder'
import { positionInTimeGrid } from '../position-in-time-grid'
import { __createAppWithViews__ } from '../../testing/__create-app-with-views__'
import { createWeek } from '../../views/week/create-week'

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

  it('should add time grid event to actual day even if start is before day boundary, but also after end of previous day', () => {
    const $app = __createAppWithViews__({
      dayBoundaries: {
        start: '10:00',
        end: '22:00',
      },
      selectedDate: '2020-01-01',
    })
    const timeEvent1 = {
      start: '2020-01-01 08:00',
      end: '2020-01-01 12:00',
      id: '1',
    }
    const event1 = createEvent(timeEvent1)
    const week = createWeek($app)

    const result = positionInTimeGrid([event1], week, $app)

    expect(result['2019-12-31'].timeGridEvents.length).toBe(0)
    expect(result['2020-01-01'].timeGridEvents).toEqual([event1])
  })

  it('should add time grid event to previous day if days are hybrid, and event starts before previous day end', () => {
    const $app = __createAppWithViews__({
      dayBoundaries: {
        start: '10:00',
        end: '08:00',
      },
      selectedDate: '2020-01-01',
    })
    const timeEvent1 = {
      start: '2020-01-01 07:00',
      end: '2020-01-01 09:00',
      id: '1',
    }
    const event1 = createEvent(timeEvent1)
    const week = createWeek($app)

    const result = positionInTimeGrid([event1], week, $app)

    expect(result['2019-12-31'].timeGridEvents).toEqual([event1])
    expect(result['2020-01-01'].timeGridEvents.length).toBe(0)
  })
})

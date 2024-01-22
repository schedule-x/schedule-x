import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { RRValues } from '../recurrence-set-builder'
import { RecurrenceSetDndUpdater } from '../recurrence-set-dnd-updater'
import { CalendarAppSingleton } from '@schedule-x/shared'

describe('Updating the recurrence rules of an event', () => {
  describe('Updating an event with weekly recurrence and a byday rule', () => {
    let $app: CalendarAppSingleton

    beforeEach(() => {
      $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-22 00:00',
            end: '2024-01-22 01:00',
            rrule: {
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO, RRValues.SU],
              until: '2024-02-05 00:00',
            },
          },
        ],
      })
    })

    it('should update the event start and end', () => {
      new RecurrenceSetDndUpdater(
        $app,
        '1',
        '2024-01-22 00:00',
        '2024-01-23 00:00'
      ).update()

      expect($app.calendarEvents.list.value[0].start).toEqual(
        '2024-01-23 00:00'
      )
      expect($app.calendarEvents.list.value[0].end).toEqual('2024-01-23 01:00')
    })

    it('should update the rrule options through dragging the first event recurrence', () => {
      new RecurrenceSetDndUpdater(
        $app,
        '1',
        '2024-01-22 00:00',
        '2024-01-23 00:00'
      ).update()

      expect(
        $app.calendarEvents.list.value[0]._getForeignProperties().rrule
      ).toEqual({
        freq: RRValues.WEEKLY,
        byweekday: [RRValues.TU, RRValues.MO],
        until: '2024-02-06 00:00',
      })
    })

    it('should update the rrule options through dragging the second event recurrence', () => {
      new RecurrenceSetDndUpdater(
        $app,
        '1',
        '2024-01-29 00:00',
        '2024-01-27 00:00'
      ).update()

      expect(
        $app.calendarEvents.list.value[0]._getForeignProperties().rrule
      ).toEqual({
        freq: RRValues.WEEKLY,
        byweekday: [RRValues.SA, RRValues.FR],
        until: '2024-02-03 00:00',
      })
    })

    it('should throw when trying to update an event that does not exist', () => {
      expect(() => {
        new RecurrenceSetDndUpdater(
          $app,
          '2',
          '2024-01-29 00:00',
          '2024-01-27 00:00'
        ).update()
      }).toThrowError('Event with id 2 not found')
    })
  })

  describe('Updating an event with weekly recurrence and exdates', () => {
    let $app: CalendarAppSingleton

    beforeEach(() => {
      $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: '2024-01-22 00:00',
            end: '2024-01-22 01:00',
            rrule: {
              freq: RRValues.WEEKLY,
              byweekday: [RRValues.MO, RRValues.SU],
              until: '2024-02-05 00:00',
            },
            exdate: ['2024-01-29 00:00'],
          },
        ],
      })
    })

    it('should update rrule and exdate through dragging one week backwards', () => {
      new RecurrenceSetDndUpdater(
        $app,
        '1',
        '2024-01-22 00:00',
        '2024-01-15 00:00'
      ).update()

      expect(
        $app.calendarEvents.list.value[0]._getForeignProperties().rrule
      ).toEqual({
        freq: RRValues.WEEKLY,
        byweekday: [RRValues.MO, RRValues.SU],
        until: '2024-01-29 00:00',
      })
      expect(
        $app.calendarEvents.list.value[0]._getForeignProperties().exdate
      ).toEqual(['2024-01-22 00:00'])
    })
  })
})

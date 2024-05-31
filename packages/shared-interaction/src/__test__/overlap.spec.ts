import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { findAllOverlappingEvents } from '../index'
import { stubInterface } from 'ts-sinon'
import { CalendarAppSingleton, CalendarEventInternal } from '@schedule-x/shared'
import { signal } from '@preact/signals'

describe('finding overlapping events by time', () => {
  describe('when there are no events', () => {
    it('should throw an error', () => {
      const oldEventTime = {
        start: '2021-01-01 00:00',
        end: '2021-01-01 01:00',
      }
      const newEventTime = {
        start: '2021-01-01 02:00',
        end: '2021-01-01 03:00',
      }
      const $app = stubInterface<CalendarAppSingleton>()
      $app.calendarEvents = {
        ...stubInterface(),
        list: signal([]),
      }

      expect(() =>
        findAllOverlappingEvents(oldEventTime, newEventTime, $app)
      ).toThrow()
    })
  })

  describe('when there are events', () => {
    it('should return the ids of events with clear overlaps', () => {
      const e1 = stubInterface<CalendarEventInternal>()
      e1.id = '1'
      e1.start = '2021-01-01 00:00'
      e1.end = '2021-01-01 01:00'
      const e2 = stubInterface<CalendarEventInternal>()
      e2.id = '2'
      e2.start = '2021-01-01 05:00'
      e2.end = '2021-01-01 06:00'
      const e3 = stubInterface<CalendarEventInternal>()
      e3.id = '3'
      e3.start = '2021-01-01 12:00'
      e3.end = '2021-01-01 13:00'
      const oldEventTime = {
        start: '2021-01-01 00:00',
        end: '2021-01-01 01:00',
      }
      const newEventTime = {
        start: '2021-01-01 04:30',
        end: '2021-01-01 05:30',
      }
      const $app = stubInterface<CalendarAppSingleton>()
      $app.calendarEvents = {
        ...stubInterface(),
        list: signal([e1, e2, e3]),
      }

      const result = findAllOverlappingEvents(oldEventTime, newEventTime, $app)

      expect(result).toEqual(['1', '2'])
    })

    it('should return ids of events that overlap only by having equal start or end times', () => {
      const e1 = stubInterface<CalendarEventInternal>()
      e1.id = '1'
      e1.start = '2021-01-01 00:00'
      e1.end = '2021-01-01 00:59'
      const e2 = stubInterface<CalendarEventInternal>()
      e2.id = '2'
      e2.start = '2021-01-01 01:00'
      e2.end = '2021-01-01 02:00'
      const e3 = stubInterface<CalendarEventInternal>()
      e3.id = '3'
      e3.start = '2021-01-01 02:00'
      e3.end = '2021-01-01 03:00'
      const e4 = stubInterface<CalendarEventInternal>()
      e4.id = '4'
      e4.start = '2021-01-01 03:00'
      e4.end = '2021-01-01 04:00'
      const e5 = stubInterface<CalendarEventInternal>()
      e5.id = '5'
      e5.start = '2021-01-01 04:00'
      e5.end = '2021-01-01 05:00'
      const $app = stubInterface<CalendarAppSingleton>()
      $app.calendarEvents = {
        ...stubInterface(),
        list: signal([e1, e2, e3, e4, e5]),
      }
      const oldEventTime = { start: e2.start, end: e2.end }
      const newEventTime = { start: e3.start, end: e3.end }

      const result = findAllOverlappingEvents(oldEventTime, newEventTime, $app)

      expect(result).toEqual([e2.id, e3.id, e4.id])
    })
  })
})

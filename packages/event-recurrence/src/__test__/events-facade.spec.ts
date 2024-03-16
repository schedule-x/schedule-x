/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createEventRecurrencePlugin } from '../event-recurrence-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'

describe('Events facade for recurrence plugin', () => {
  describe('Adding events', () => {
    it('should add one event without an rrule', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
      }
      eventsFacade.add(event)

      expect($app.calendarEvents.list.value.length).toBe(1)
    })

    it('should add one event with an rrule', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event)

      expect($app.calendarEvents.list.value.length).toBe(3)
    })
  })

  describe('Getting a single event by id', () => {
    it('should return the event if it exists', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event)

      expect(eventsFacade.get('1')).toEqual(event)
    })

    it('should return undefined if the event does not exist', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      expect(eventsFacade.get('1')).toBeUndefined()
    })
  })

  describe('Getting all events', () => {
    it('should return all events', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event1 = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event1)
      const event2 = {
        id: '2',
        start: '2021-01-01',
        end: '2021-01-01',
      }
      eventsFacade.add(event2)

      expect(eventsFacade.getAll()).toHaveLength(2)
      expect(eventsFacade.getAll()).toEqual(
        expect.arrayContaining([
          event1,
          { id: '2', start: '2021-01-01', end: '2021-01-01' },
        ])
      )
    })
  })

  describe('Removing events', () => {
    it('should remove one event without an rrule', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
      }
      eventsFacade.add(event)
      expect($app.calendarEvents.list.value.length).toBe(1)

      eventsFacade.remove('1')
      expect($app.calendarEvents.list.value.length).toBe(0)
    })

    it('should remove one event with an rrule', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event)
      expect($app.calendarEvents.list.value.length).toBe(3)

      eventsFacade.remove('1')
      expect($app.calendarEvents.list.value.length).toBe(0)
    })
  })

  describe('Updating events', () => {
    it('should update an event with rrule', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event)
      expect($app.calendarEvents.list.value.length).toBe(3)

      eventsFacade.update({ id: '1', start: '2021-01-01', end: '2021-01-01' })
      expect($app.calendarEvents.list.value.length).toBe(1)
    })
  })

  describe('Setting the whole list of events', () => {
    it('should set the whole list of events', () => {
      const $app = __createAppWithViews__()
      const plugin = createEventRecurrencePlugin()
      plugin.init!($app)
      const eventsFacade = plugin.eventsFacade
      expect($app.calendarEvents.list.value.length).toBe(0)

      const event1 = {
        id: '1',
        start: '2021-01-01',
        end: '2021-01-01',
        rrule: 'FREQ=WEEKLY;COUNT=3',
      }
      eventsFacade.add(event1)
      const event2 = {
        id: '2',
        start: '2021-01-01',
        end: '2021-01-01',
      }
      eventsFacade.add(event2)

      expect(eventsFacade.getAll()).toHaveLength(2)
      expect(eventsFacade.getAll()).toEqual(
        expect.arrayContaining([
          event1,
          { id: '2', start: '2021-01-01', end: '2021-01-01' },
        ])
      )

      eventsFacade.set([{ id: '3', start: '2021-01-01', end: '2021-01-01' }])
      expect(eventsFacade.getAll()).toHaveLength(1)
      expect(eventsFacade.getAll()).toEqual(
        expect.arrayContaining([
          { id: '3', start: '2021-01-01', end: '2021-01-01' },
        ])
      )
    })
  })
})

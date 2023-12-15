import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { viewMonthGrid } from '../views/month-grid'
import { cleanup, waitFor } from '@testing-library/preact'
import CalendarApp from '../calendar.app'

const sampleEventTime = {
  start: '2020-01-01',
  end: '2020-01-02',
}

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('interacting with the events facade', () => {
    const calendarEl = document.createElement('div')
    let calendarApp: CalendarApp

    beforeEach(() => {
      calendarApp = createCalendar(calendarEl, {
        views: [viewMonthGrid],
      })
    })

    it('should add an event and then access it over getAll()', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)

      calendarApp.events.add({
        id: '1',
        title: 'test',
        time: sampleEventTime,
      })

      expect((calendarApp as CalendarApp).events.getAll()).length(1)
    })

    it('should add an event and then access it over get()', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'
      const EVENT_TITLE = 'test'

      calendarApp.events.add({
        id: EVENT_ID,
        title: EVENT_TITLE,
        time: sampleEventTime,
      })

      const event = (calendarApp as CalendarApp).events.get(EVENT_ID)
      expect(event).toBeDefined()
      expect(event?.title).toBe(EVENT_TITLE)
    })

    it('should receive undefined when trying to access an event that does not exist', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'

      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        time: sampleEventTime,
      })

      expect((calendarApp as CalendarApp).events.get('2')).toBeUndefined()
    })

    it('should remove an event', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'
      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        time: sampleEventTime,
      })
      expect((calendarApp as CalendarApp).events.getAll()).length(1)

      calendarApp.events.remove(EVENT_ID)

      expect((calendarApp as CalendarApp).events.getAll()).length(0)
    })

    it('should update an event', () => {
      // Arrange
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'
      const INITIAL_TITLE = 'test'
      const EXPECTED_CHANGED_TITLE = 'test2'
      const INITIAL_EVENT = {
        id: EVENT_ID,
        title: INITIAL_TITLE,
        time: sampleEventTime,
      }
      calendarApp.events.add(INITIAL_EVENT)
      expect((calendarApp as CalendarApp).events.get(EVENT_ID)?.title).toBe(
        INITIAL_TITLE
      )

      // Act
      calendarApp.events.update({
        ...INITIAL_EVENT,
        title: EXPECTED_CHANGED_TITLE,
      })

      // Assert
      expect((calendarApp as CalendarApp).events.get(EVENT_ID)?.title).toBe(
        EXPECTED_CHANGED_TITLE
      )
    })
  })

  describe('changing theme', () => {
    it('should change the theme to dark', async () => {
      const calendarEl = document.createElement('div')
      document.body.appendChild(calendarEl)
      const calendarApp = createCalendar(calendarEl, {
        views: [viewMonthGrid],
      })
      calendarApp.render()
      expect(document.querySelector('.is-dark')).toBeFalsy()

      calendarApp.setTheme('dark')

      await waitFor(() => {
        expect(document.querySelector('.is-dark')).toBeTruthy()
      })
    })
  })
})

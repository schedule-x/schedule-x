import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { viewMonthGrid } from '../views/month-grid'
import { cleanup } from '@testing-library/preact'
import CalendarApp from '../calendar.app'

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('bootstrapping the app', () => {
    it('should render the CalendarWrapper component', () => {
      const calendarEl = document.createElement('div')
      document.body.appendChild(calendarEl)
      const calendarApp = createCalendar(calendarEl, {
        views: [viewMonthGrid],
      })
      expect(document.querySelector('.sx__calendar-wrapper')).toBeNull()

      calendarApp.bootstrap()

      expect(document.querySelector('.sx__calendar-wrapper')).toBeInstanceOf(
        HTMLElement
      )
    })
  })

  describe('interacting with the events facade', () => {
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
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
        time: {
          start: '2020-01-01',
          end: '2020-01-02',
        },
      })

      expect((calendarApp as CalendarApp).events.getAll()).length(1)
    })

    it('should add an event and then access it over get()', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'

      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        time: {
          start: '2020-01-01',
          end: '2020-01-02',
        },
      })

      expect((calendarApp as CalendarApp).events.get(EVENT_ID)).toBeDefined()
    })

    it('should receive undefined when trying to access an event that does not exist', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'

      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        time: {
          start: '2020-01-01',
          end: '2020-01-02',
        },
      })

      expect((calendarApp as CalendarApp).events.get('2')).toBeUndefined()
    })

    it('should remove an event', () => {
      expect((calendarApp as CalendarApp).events.getAll()).length(0)
      const EVENT_ID = '1'

      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        time: {
          start: '2020-01-01',
          end: '2020-01-02',
        },
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
        time: {
          start: '2020-01-01',
          end: '2020-01-02',
        },
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
})

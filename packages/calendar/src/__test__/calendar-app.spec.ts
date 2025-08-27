import 'temporal-polyfill/global'
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
import { vi } from 'vitest'

const sampleEventTime = {
  start: Temporal.PlainDate.from('2020-01-01'),
  end: Temporal.PlainDate.from('2020-01-02'),
}

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('interacting with the events facade', () => {
    const calendarEl = document.createElement('div')
    let calendarApp: CalendarApp

    beforeEach(() => {
      calendarApp = createCalendar({
        views: [viewMonthGrid],
      })
      calendarApp.render(calendarEl)
    })

    it('should add an event and then access it over getAll()', () => {
      expect(calendarApp.events.getAll()).length(0)

      calendarApp.events.add({
        id: '1',
        title: 'test',
        ...sampleEventTime,
      })

      expect(calendarApp.events.getAll()).length(1)
    })

    it('should add an event and then access it over get()', () => {
      expect(calendarApp.events.getAll()).length(0)
      const EVENT_ID = '1'
      const EVENT_TITLE = 'test'

      calendarApp.events.add({
        id: EVENT_ID,
        title: EVENT_TITLE,
        ...sampleEventTime,
      })

      const event = calendarApp.events.get(EVENT_ID)
      expect(event).toBeDefined()
      expect(event?.title).toBe(EVENT_TITLE)
    })

    it('should receive undefined when trying to access an event that does not exist', () => {
      expect(calendarApp.events.getAll()).length(0)
      const EVENT_ID = '1'

      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        ...sampleEventTime,
      })

      expect(calendarApp.events.get('2')).toBeUndefined()
    })

    it('should remove an event', () => {
      expect(calendarApp.events.getAll()).length(0)
      const EVENT_ID = '1'
      calendarApp.events.add({
        id: EVENT_ID,
        title: 'test',
        ...sampleEventTime,
      })
      expect(calendarApp.events.getAll()).length(1)

      calendarApp.events.remove(EVENT_ID)

      expect(calendarApp.events.getAll()).length(0)
    })

    it('should update an event', () => {
      // Arrange
      expect(calendarApp.events.getAll()).length(0)
      const EVENT_ID = '1'
      const INITIAL_TITLE = 'test'
      const EXPECTED_CHANGED_TITLE = 'test2'
      const INITIAL_EVENT = {
        id: EVENT_ID,
        title: INITIAL_TITLE,
        ...sampleEventTime,
      }
      calendarApp.events.add(INITIAL_EVENT)
      expect(calendarApp.events.get(EVENT_ID)?.title).toBe(INITIAL_TITLE)

      // Act
      calendarApp.events.update({
        ...INITIAL_EVENT,
        title: EXPECTED_CHANGED_TITLE,
      })

      // Assert
      expect(calendarApp.events.get(EVENT_ID)?.title).toBe(
        EXPECTED_CHANGED_TITLE
      )
    })

    it('should set the whole events list', () => {
      // Arrange
      expect(calendarApp.events.getAll()).length(0)
      const EVENT_ID = '1'
      const INITIAL_TITLE = 'test'
      const INITIAL_EVENT = {
        id: EVENT_ID,
        title: INITIAL_TITLE,
        ...sampleEventTime,
      }
      const NEW_EVENTS = [
        INITIAL_EVENT,
        {
          id: '2',
          title: 'test2',
          ...sampleEventTime,
        },
      ]
      calendarApp.events.add(INITIAL_EVENT)
      expect(calendarApp.events.getAll()).length(1)

      // Act
      calendarApp.events.set(NEW_EVENTS)

      // Assert
      expect(calendarApp.events.getAll()).length(2)
    })
  })

  describe('changing theme', () => {
    it('should change the theme to dark', async () => {
      const calendarEl = document.createElement('div')
      document.body.appendChild(calendarEl)
      const calendarApp = createCalendar({
        views: [viewMonthGrid],
      })
      calendarApp.render(calendarEl)
      expect(document.querySelector('.is-dark')).toBeFalsy()

      calendarApp.setTheme('dark')

      await waitFor(() => {
        expect(document.querySelector('.is-dark')).toBeTruthy()
      })
    })
  })

  describe('calling plugin lifecycle methods', () => {
    it('should call the beforeInit method of a plugin', () => {
      const testPlugin = {
        name: 'test',
        beforeRender: vi.fn(),
      }
      const calendarApp = createCalendar({
        views: [viewMonthGrid],
        plugins: [testPlugin],
      })

      calendarApp.render(document.createElement('div'))

      expect(testPlugin.beforeRender).toHaveBeenCalled()
    })

    it('should not call the init method of a plugin in the calendarApp constructor, but only after render', async () => {
      const testPlugin = {
        name: 'test',
        onRender: vi.fn(),
      }
      const calendarApp = createCalendar({
        views: [viewMonthGrid],
        plugins: [testPlugin],
      })

      expect(testPlugin.onRender).not.toHaveBeenCalled()

      calendarApp.render(document.createElement('div'))

      await waitFor(() => {
        expect(testPlugin.onRender).toHaveBeenCalled()
      })
    })
  })

  describe('calling calendar lifecycle methods', () => {
    it('should call the beforeRender method', () => {
      const beforeRenderSpy = vi.fn()

      createCalendar({
        views: [viewMonthGrid],
        callbacks: {
          beforeRender: beforeRenderSpy,
        },
      })

      expect(beforeRenderSpy).toHaveBeenCalled()
    })

    it('should call the onRender method', async () => {
      const onRenderSpy = vi.fn()

      const calendarApp = createCalendar({
        views: [viewMonthGrid],
        callbacks: {
          onRender: onRenderSpy,
        },
      })

      expect(onRenderSpy).not.toHaveBeenCalled()

      calendarApp.render(document.createElement('div'))

      await waitFor(() => {
        expect(onRenderSpy).toHaveBeenCalled()
      })
    })
  })
})

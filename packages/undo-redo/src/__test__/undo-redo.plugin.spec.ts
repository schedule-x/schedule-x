/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createUndoRedoPlugin } from '../undo-redo.plugin'
import { createEventsServicePlugin } from '@schedule-x/events-service/src'

describe('UndoRedoPlugin', () => {
  describe('simple undo', () => {
    it('should call the undo action with 1 action in stack', () => {
      const eventsServicePlugin = createEventsServicePlugin()
      const undoRedoPlugin = createUndoRedoPlugin()
      const $app = __createAppWithViews__({
        events: [
          { id: '1', title: 'Event 1', start: '2024-01-01', end: '2024-01-02' },
          { id: '2', title: 'Event 2', start: '2024-01-02', end: '2024-01-03' },
          { id: '3', title: 'Event 3', start: '2024-01-03', end: '2024-01-04' },
        ],
        plugins: [eventsServicePlugin, undoRedoPlugin],
      })

      undoRedoPlugin.beforeInit($app)
      eventsServicePlugin.beforeInit($app)
      expect($app.calendarEvents.list.value.length).toBe(3)

      eventsServicePlugin.remove('1')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '1',
            title: 'Event 1',
            start: '2024-01-01',
            end: '2024-01-02',
          }),
        () => eventsServicePlugin.remove('1')
      )
      expect($app.calendarEvents.list.value.length).toBe(2)

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(3)
    })

    it('should undo 3 actions in stack', () => {
      const eventsServicePlugin = createEventsServicePlugin()
      const undoRedoPlugin = createUndoRedoPlugin()
      const $app = __createAppWithViews__({
        events: [
          { id: '1', title: 'Event 1', start: '2024-01-01', end: '2024-01-02' },
          { id: '2', title: 'Event 2', start: '2024-01-02', end: '2024-01-03' },
          { id: '3', title: 'Event 3', start: '2024-01-03', end: '2024-01-04' },
        ],
        plugins: [eventsServicePlugin, undoRedoPlugin],
      })

      undoRedoPlugin.beforeInit($app)
      eventsServicePlugin.beforeInit($app)
      expect($app.calendarEvents.list.value.length).toBe(3)

      eventsServicePlugin.remove('1')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '1',
            title: 'Event 1',
            start: '2024-01-01',
            end: '2024-01-02',
          }),
        () => eventsServicePlugin.remove('1')
      )
      expect($app.calendarEvents.list.value.length).toBe(2)

      eventsServicePlugin.remove('2')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '2',
            title: 'Event 2',
            start: '2024-01-02',
            end: '2024-01-03',
          }),
        () => eventsServicePlugin.remove('2')
      )
      expect($app.calendarEvents.list.value.length).toBe(1)

      eventsServicePlugin.remove('3')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '3',
            title: 'Event 3',
            start: '2024-01-03',
            end: '2024-01-04',
          }),
        () => eventsServicePlugin.remove('3')
      )
      expect($app.calendarEvents.list.value.length).toBe(0)

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(1)
      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(2)
      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(3)
    })
  })

  describe('simple undo and redo', () => {
    it('should undo and redo 1 action in stack', () => {
      const eventsServicePlugin = createEventsServicePlugin()
      const undoRedoPlugin = createUndoRedoPlugin()
      const $app = __createAppWithViews__({
        events: [
          { id: '1', title: 'Event 1', start: '2024-01-01', end: '2024-01-02' },
          { id: '2', title: 'Event 2', start: '2024-01-02', end: '2024-01-03' },
          { id: '3', title: 'Event 3', start: '2024-01-03', end: '2024-01-04' },
        ],
        plugins: [eventsServicePlugin, undoRedoPlugin],
      })

      undoRedoPlugin.beforeInit($app)
      eventsServicePlugin.beforeInit($app)
      expect($app.calendarEvents.list.value.length).toBe(3)

      eventsServicePlugin.remove('1')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '1',
            title: 'Event 1',
            start: '2024-01-01',
            end: '2024-01-02',
          }),
        () => eventsServicePlugin.remove('1')
      )
      expect($app.calendarEvents.list.value.length).toBe(2)

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(3)

      undoRedoPlugin.redo()
      expect($app.calendarEvents.list.value.length).toBe(2)
    })
  })

  describe('undo/redo with multiple actions', () => {
    it('should undo and redo back and forth with an event update', () => {
      const eventsServicePlugin = createEventsServicePlugin()
      const undoRedoPlugin = createUndoRedoPlugin()
      const $app = __createAppWithViews__({
        events: [
          { id: '1', title: 'Event 1', start: '2024-01-01', end: '2024-01-02' },
        ],
        plugins: [eventsServicePlugin, undoRedoPlugin],
      })

      undoRedoPlugin.beforeInit($app)
      eventsServicePlugin.beforeInit($app)
      expect($app.calendarEvents.list.value.length).toBe(1)

      eventsServicePlugin.update({
        id: '1',
        title: 'Event 1 Updated',
        start: '2024-01-01',
        end: '2024-01-02',
      })
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.update({
            id: '1',
            title: 'Event 1',
            start: '2024-01-01',
            end: '2024-01-02',
          }),
        () =>
          eventsServicePlugin.update({
            id: '1',
            title: 'Event 1 Updated',
            start: '2024-01-01',
            end: '2024-01-02',
          })
      )
      expect($app.calendarEvents.list.value[0].title).toBe('Event 1 Updated')

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value[0].title).toBe('Event 1')

      undoRedoPlugin.redo()
      expect($app.calendarEvents.list.value[0].title).toBe('Event 1 Updated')

      eventsServicePlugin.remove('1')
      undoRedoPlugin.addUndoAction(
        () =>
          eventsServicePlugin.add({
            id: '1',
            title: 'Event 1 Updated',
            start: '2024-01-01',
            end: '2024-01-02',
          }),
        () => eventsServicePlugin.remove('1')
      )
      expect($app.calendarEvents.list.value.length).toBe(0)

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(1)
      expect($app.calendarEvents.list.value[0].title).toBe('Event 1 Updated')

      undoRedoPlugin.undo()
      expect($app.calendarEvents.list.value.length).toBe(1)
      expect($app.calendarEvents.list.value[0].title).toBe('Event 1')
    })
  })
})

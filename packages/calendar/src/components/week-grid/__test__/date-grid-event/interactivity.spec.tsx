/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { renderComponent } from './utils'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'

describe('DateGridEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
  })

  describe('when dnd is enabled', () => {
    it('should start dragging', () => {
      const dndPlugin = stubInterface<DragAndDropPlugin>()
      dndPlugin.name = PluginName.DragAndDrop
      dndPlugin.createDateGridDragHandler =
        vi.fn() as unknown as typeof dndPlugin.createDateGridDragHandler
      const eventId = 'my-event-id'
      const $app = __createAppWithViews__({
        plugins: [dndPlugin],
        events: [
          {
            id: eventId,
            title: 'My event',
            start: '2024-10-01',
            end: '2024-10-01',
          },
        ],
      })

      renderComponent($app, eventId, 1)

      const eventEl = document.querySelector('.sx__date-grid-event')
      if (!eventEl) throw new Error('Event element not found')
      const mouseDownEvent = new MouseEvent('mousedown')
      eventEl.dispatchEvent(mouseDownEvent)

      expect(dndPlugin.createDateGridDragHandler).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1000)

      expect(dndPlugin.createDateGridDragHandler).toHaveBeenCalled()
    })
  })

  describe('when dnd is disabled', () => {
    it('should not start dragging', () => {
      const dndPlugin = stubInterface<DragAndDropPlugin>()
      dndPlugin.name = PluginName.DragAndDrop
      dndPlugin.createDateGridDragHandler =
        vi.fn() as unknown as typeof dndPlugin.createDateGridDragHandler
      const eventId = 'my-event-id'
      const $app = __createAppWithViews__({
        plugins: [dndPlugin],
        events: [
          {
            id: eventId,
            title: 'My event',
            start: '2024-10-01',
            end: '2024-10-01',
            _options: {
              disableDND: true,
            },
          },
        ],
      })

      renderComponent($app, eventId, 1)

      const eventEl = document.querySelector('.sx__date-grid-event')
      if (!eventEl) throw new Error('Event element not found')
      const mouseDownEvent = new MouseEvent('mousedown')
      eventEl.dispatchEvent(mouseDownEvent)

      expect(dndPlugin.createDateGridDragHandler).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1000)

      expect(dndPlugin.createDateGridDragHandler).not.toHaveBeenCalled()
    })
  })

  describe('when resizing is enabled', () => {
    it('should start resizing', () => {
      const resizePlugin = stubInterface<ResizePlugin>()
      resizePlugin.name = PluginName.Resize
      resizePlugin.createDateGridEventResizer =
        vi.fn() as unknown as typeof resizePlugin.createDateGridEventResizer
      const eventId = 'my-event-id'
      const $app = __createAppWithViews__({
        plugins: [resizePlugin],
        events: [
          {
            id: eventId,
            title: 'My event',
            start: '2024-10-01',
            end: '2024-10-01',
          },
        ],
        selectedDate: '2024-10-01',
      })

      renderComponent($app, eventId, 1)

      const resizeHandler = document.querySelector(
        '.sx__date-grid-event-resize-handle'
      )
      if (!resizeHandler) throw new Error('Resize handler not found')
      const mouseDownEvent = new MouseEvent('mousedown')

      expect(resizePlugin.createDateGridEventResizer).not.toHaveBeenCalled()

      resizeHandler.dispatchEvent(mouseDownEvent)
      vi.advanceTimersByTime(1000)

      expect(resizePlugin.createDateGridEventResizer).toHaveBeenCalled()
    })
  })

  describe('when resizing is disabled', () => {
    it('should not start resizing', () => {
      const resizePlugin = stubInterface<ResizePlugin>()
      resizePlugin.name = PluginName.Resize
      resizePlugin.createDateGridEventResizer =
        vi.fn() as unknown as typeof resizePlugin.createDateGridEventResizer
      const eventId = 'my-event-id'
      const $app = __createAppWithViews__({
        plugins: [resizePlugin],
        events: [
          {
            id: eventId,
            title: 'My event',
            start: '2024-10-01',
            end: '2024-10-01',
            _options: {
              disableResize: true,
            },
          },
        ],
        selectedDate: '2024-10-01',
      })

      renderComponent($app, eventId, 1)

      const resizeHandler = document.querySelector(
        '.sx__date-grid-event-resize-handle'
      )
      if (!resizeHandler) throw new Error('Resize handler not found')
      const mouseDownEvent = new MouseEvent('mousedown')

      expect(resizePlugin.createDateGridEventResizer).not.toHaveBeenCalled()

      resizeHandler.dispatchEvent(mouseDownEvent)
      vi.advanceTimersByTime(1000)

      expect(resizePlugin.createDateGridEventResizer).not.toHaveBeenCalled()
    })
  })
})

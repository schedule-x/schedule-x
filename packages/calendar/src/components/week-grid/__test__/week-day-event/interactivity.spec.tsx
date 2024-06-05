import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { beforeEach, vi } from 'vitest'
import { renderComponent } from './utils'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'
import { cleanup } from '@testing-library/preact'

describe('TimeGridEvent interactivity', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
  })

  describe('when dnd is disabled for event', () => {
    it('should not start dragging', () => {
      const dragAndDropPlugin = stubInterface<DragAndDropPlugin>()
      dragAndDropPlugin.name = PluginName.DragAndDrop
      dragAndDropPlugin.createTimeGridDragHandler =
        vi.fn() as unknown as typeof dragAndDropPlugin.createTimeGridDragHandler
      const $app = __createAppWithViews__({
        plugins: [dragAndDropPlugin],
        events: [
          {
            start: '2021-10-10 00:00',
            end: '2021-10-10 01:00',
            id: 1,
            _options: {
              disableDND: true,
            },
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const mouseEvent = new MouseEvent('mousedown')
      const timeGridEvent = document.querySelector('.sx__event')
      timeGridEvent?.dispatchEvent(mouseEvent)

      vi.advanceTimersByTime(1000)

      expect(dragAndDropPlugin.createTimeGridDragHandler).not.toHaveBeenCalled()
    })
  })

  describe('when resizing is disabled for event', () => {
    it('should not start resizing', () => {
      const resizePlugin = stubInterface<ResizePlugin>()
      resizePlugin.name = PluginName.Resize
      resizePlugin.createTimeGridEventResizer =
        vi.fn() as unknown as typeof resizePlugin.createTimeGridEventResizer
      const $app = __createAppWithViews__({
        plugins: [resizePlugin],
        events: [
          {
            start: '2021-10-10 00:00',
            end: '2021-10-10 01:00',
            id: 1,
            _options: {
              disableResize: true,
            },
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const mouseEvent = new MouseEvent('mousedown')
      const resizeHandle = document.querySelector(
        '.sx__time-grid-event-resize-handle'
      )
      resizeHandle?.dispatchEvent(mouseEvent)

      vi.advanceTimersByTime(1000)

      expect(resizePlugin.createTimeGridEventResizer).not.toHaveBeenCalled()
    })
  })
})

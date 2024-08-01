import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { stubInterface } from 'ts-sinon'
import DragAndDropPlugin from '@schedule-x/shared/src/interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { renderComponent } from './utils'

describe('MonthGridEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
  })

  describe('drag and drop', () => {
    it('should start a drag action on mousedown and hold', () => {
      const dragAndDropPlugin = stubInterface<DragAndDropPlugin>()
      dragAndDropPlugin.name = PluginName.DragAndDrop
      dragAndDropPlugin.createMonthGridDragHandler =
        vi.fn() as unknown as typeof dragAndDropPlugin.createMonthGridDragHandler
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
        plugins: [dragAndDropPlugin],
        selectedDate: '2020-01-01',
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const event = document.querySelector('[data-event-id]')
      if (!event) throw new Error('Event not found')

      const mouseEvent = new MouseEvent('mousedown')
      event.dispatchEvent(mouseEvent)

      vi.advanceTimersByTime(500)

      expect(dragAndDropPlugin.createMonthGridDragHandler).toBeCalled()
    })

    it('should start a drag action on touchstart and hold', () => {
      const dragAndDropPlugin = stubInterface<DragAndDropPlugin>()
      dragAndDropPlugin.name = PluginName.DragAndDrop
      dragAndDropPlugin.createMonthGridDragHandler =
        vi.fn() as unknown as typeof dragAndDropPlugin.createMonthGridDragHandler
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
        plugins: [dragAndDropPlugin],
        selectedDate: '2020-01-01',
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const event = document.querySelector('[data-event-id]')
      if (!event) throw new Error('Event not found')

      const touchEvent = new TouchEvent('touchstart')
      event.dispatchEvent(touchEvent)

      vi.advanceTimersByTime(500)

      expect(dragAndDropPlugin.createMonthGridDragHandler).toBeCalled()
    })
  })

  describe('disabling drag and drop', () => {
    it('should not start a drag action on mousedown and hold', () => {
      const dragAndDropPlugin = stubInterface<DragAndDropPlugin>()
      dragAndDropPlugin.name = PluginName.DragAndDrop
      dragAndDropPlugin.createMonthGridDragHandler =
        vi.fn() as unknown as typeof dragAndDropPlugin.createMonthGridDragHandler
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
            _options: {
              disableDND: true,
            },
          },
        ],
        plugins: [dragAndDropPlugin],
        selectedDate: '2020-01-01',
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      const event = document.querySelector('[data-event-id]')
      if (!event) throw new Error('Event not found')

      const mouseEvent = new MouseEvent('mousedown')
      event.dispatchEvent(mouseEvent)

      vi.advanceTimersByTime(500)

      expect(dragAndDropPlugin.createMonthGridDragHandler).not.toBeCalled()
    })
  })
})

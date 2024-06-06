import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, waitFor } from '@testing-library/preact'
import { afterEach } from 'vitest'
import { getEventByText, renderComponent } from './utils'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'

// TODO: move to package-neutral location
describe('style attribute "display" of date grid event element', () => {
  afterEach(() => {
    cleanup()
  })

  const selectedDate = '2024-10-01'
  const oneDayEventId = 'my-event-id'
  const oneDayEventTitle = 'My event'

  const $app = __createAppWithViews__({
    selectedDate,
    plugins: [createDragAndDropPlugin()],
    events: [
      {
        id: oneDayEventId,
        title: oneDayEventTitle,
        start: selectedDate,
        end: selectedDate,
      },
    ],
  })
  $app.elements.calendarWrapper = document.createElement('div')
  const day = document.createElement('div')
  day.classList.add('sx__time-grid-day')
  $app.elements.calendarWrapper.appendChild(day)

  describe('Every event', () => {
    it('should have a data-event-id attribute', () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(oneDayEvent.getAttribute('data-event-id')).toBe(oneDayEventId)
    })
  })

  describe('event when not in drag state', () => {
    it('should have style "display: flex"', () => {
      renderComponent($app, oneDayEventId, 1)

      const oneDayEvent = getEventByText(oneDayEventTitle)
      expect(oneDayEvent.style.display).toBe('flex')
    })
  })

  describe('event when in drag state', () => {
    it('should have style "display: none"', async () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      const mouseDownEvent = new MouseEvent('mousedown', {})
      oneDayEvent.dispatchEvent(mouseDownEvent)

      await waitFor(() => {
        expect(oneDayEvent.style.display).toBe('none')
      })
    })
  })

  describe('event copy when not in drag state', () => {
    it('should not display event copy', () => {
      renderComponent($app, oneDayEventId, 1)
      const eventCopy = document.querySelector('.sx__date-grid-event--copy')

      expect(eventCopy).toBeNull()
    })
  })

  describe('event copy when in drag state', () => {
    it('should display event copy', async () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      const mouseDownEvent = new MouseEvent('mousedown', {})
      oneDayEvent.dispatchEvent(mouseDownEvent)

      await waitFor(() => {
        const eventCopy = document.querySelector('.sx__date-grid-event--copy')
        expect(eventCopy).not.toBeNull()
      })
    })
  })

  describe('starting a drag process through touchstart', () => {
    it('should have style "display: none"', async () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 0, clientY: 0 } as Touch],
      })
      oneDayEvent.dispatchEvent(touchStartEvent)

      await waitFor(() => {
        expect(oneDayEvent.style.display).toBe('none')
        const eventCopy = document.querySelector('.sx__date-grid-event--copy')
        expect(eventCopy).not.toBeNull()
      })
    })
  })

  describe('Usage of resize plugin', () => {
    it('should not display a resize handle if the resize plugin is not enabled', () => {
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(
        oneDayEvent.querySelector('.sx__date-grid-event-resize-handle')
      ).toBeNull()
    })

    it('should display a resize handle if the resize plugin is enabled', () => {
      $app.config.plugins.resize = stubInterface<ResizePlugin>()
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(
        oneDayEvent.querySelector('.sx__date-grid-event-resize-handle')
      ).not.toBeNull()
    })
  })

  describe('adding additional classes', () => {
    it('should add 2 custom classes', () => {
      const customClass1 = 'custom-class-1'
      const customClass2 = 'custom-class-2'
      $app.calendarEvents.list.value[0]._options = {
        additionalClasses: [customClass1, customClass2],
      }
      renderComponent($app, oneDayEventId, 1)
      const oneDayEvent = getEventByText(oneDayEventTitle)

      expect(oneDayEvent.classList.contains(customClass1)).toBe(true)
      expect(oneDayEvent.classList.contains(customClass2)).toBe(true)
    })
  })
})

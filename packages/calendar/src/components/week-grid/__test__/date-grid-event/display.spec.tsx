import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { afterEach } from 'vitest'
import { factory } from './utils'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

// TODO: move to package-neutral location
describe('style attribute "display" of date grid event element', () => {
  afterEach(() => {
    cleanup()
  })

  const selectedDate = '2024-10-01'
  const oneDayEventId = 'my-event-id'
  const oneDayEventTitle = 'My event'

  const $app = __createAppWithViews__({
    datePicker: {
      selectedDate: selectedDate,
    },
    plugins: [createDragAndDropPlugin()],
    events: [
      {
        id: oneDayEventId,
        title: oneDayEventTitle,
        time: {
          start: selectedDate,
          end: selectedDate,
        },
      },
    ],
  })
  $app.elements.calendarWrapper = document.createElement('div')
  const day = document.createElement('div')
  day.classList.add('sx__time-grid-day')
  $app.elements.calendarWrapper.appendChild(day)

  describe('event when not in drag state', () => {
    it('should have style "display: flex"', () => {
      factory($app, oneDayEventId, 1)

      const oneDayEvent = screen.getByText(oneDayEventTitle)
      expect(oneDayEvent.style.display).toBe('flex')
    })
  })

  describe('event when in drag state', () => {
    it('should have style "display: none"', async () => {
      factory($app, oneDayEventId, 1)
      const oneDayEvent = screen.getByText(oneDayEventTitle)

      const mouseDownEvent = new MouseEvent('mousedown', {})
      oneDayEvent.dispatchEvent(mouseDownEvent)

      await waitFor(() => {
        expect(oneDayEvent.style.display).toBe('none')
      })
    })
  })

  describe('event copy when not in drag state', () => {
    it('should not display event copy', () => {
      factory($app, oneDayEventId, 1)
      const eventCopy = document.querySelector('.sx__date-grid-event--copy')

      expect(eventCopy).toBeNull()
    })
  })

  describe('event copy when in drag state', () => {
    it('should display event copy', async () => {
      factory($app, oneDayEventId, 1)
      const oneDayEvent = screen.getByText(oneDayEventTitle)

      const mouseDownEvent = new MouseEvent('mousedown', {})
      oneDayEvent.dispatchEvent(mouseDownEvent)

      await waitFor(() => {
        const eventCopy = document.querySelector('.sx__date-grid-event--copy')
        expect(eventCopy).not.toBeNull()
      })
    })
  })
})

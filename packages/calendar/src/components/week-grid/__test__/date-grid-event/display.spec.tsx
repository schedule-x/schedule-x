import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup } from '@testing-library/preact'
import { afterEach } from 'vitest'
import { getEventByText, renderComponent } from './utils'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { stubInterface } from 'ts-sinon'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'

describe('style attribute "display" of date grid event element', () => {
  afterEach(() => {
    cleanup()
  })

  const selectedDate = Temporal.PlainDate.from('2024-10-01')
  const oneDayEventId = 'my-event-id'
  const oneDayEventTitle = 'My event'

  const $app = __createAppWithViews__({
    selectedDate,
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

  describe('displaying custom content', () => {
    it('should show custom html and no default', () => {
      const customContent = '<div class="custom-content">Custom content</div>'
      $app.calendarEvents.list.value[0]._customContent = {
        dateGrid: customContent,
      }
      renderComponent($app, oneDayEventId, 1)

      const customContentEl = document.querySelector('.custom-content')
      if (!customContentEl) throw new Error('Custom content not found')
      expect(customContentEl).not.toBeNull()
    })
  })
})

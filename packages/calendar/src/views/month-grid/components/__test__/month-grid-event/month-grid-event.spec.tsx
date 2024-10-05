import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { beforeEach, vi } from 'vitest'
import { renderComponent } from './utils'
import { cleanup } from '@testing-library/preact'

describe('MonthGridEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    cleanup()
  })

  describe('render', () => {
    it('should have a data-event-id attribute', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('[data-event-id]')?.getAttribute('data-event-id')
      ).toBe('1234')
    })
  })

  describe('adding additional classes', () => {
    it('should add the additional class to the event', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
            _options: {
              additionalClasses: ['test-class', 'test-class-2'],
            },
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(document.querySelector('.test-class')).toBeTruthy()
      expect(document.querySelector('.test-class-2')).toBeTruthy()
    })
  })

  describe('describing event overflow in class names', () => {
    it('should not add any overflow classes to event', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2020-01-01',
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-31',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-grid-event--overflow-left')
      ).toBeFalsy()
      expect(
        document.querySelector('.sx__month-grid-event--overflow-right')
      ).toBeFalsy()
    })

    it('should add overflow-left class to event', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2020-01-01',
        events: [
          {
            id: '1234',
            start: '2019-12-29',
            end: '2020-01-31',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0], true, false)

      expect(
        document.querySelector('.sx__month-grid-event--overflow-left')
      ).toBeTruthy()
      expect(
        document.querySelector('.sx__month-grid-event--overflow-right')
      ).toBeFalsy()
    })

    it('should add overflow-right class to event', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2020-01-01',
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-02-10',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0], false, true)

      expect(
        document.querySelector('.sx__month-grid-event--overflow-left')
      ).toBeFalsy()
      expect(
        document.querySelector('.sx__month-grid-event--overflow-right')
      ).toBeTruthy()
    })
  })

  describe('rendering custom content', () => {
    it('should render the custom html and not the default', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
            _customContent: {
              monthGrid: '<div class="custom-content">My custom content</div>',
            },
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(document.querySelector('.custom-content')).toBeTruthy()
      // no title
      expect(document.querySelector('.sx__month-grid-event-title')).toBeFalsy()
    })
  })
})

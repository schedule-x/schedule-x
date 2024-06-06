import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../../utils/stateless/testing/__create-app-with-views__'
import { beforeEach, vi } from 'vitest'
import { renderComponent } from './utils'

describe('MonthGridEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
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
})

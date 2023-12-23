import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import { cleanup, waitFor } from '@testing-library/preact'
import CalendarApp from '../calendar.app'
import { vi } from 'vitest'
import { viewWeek } from '../views/week'

describe('CalendarApp', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Using a custom component for the time grid', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = vi.fn()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2020-01-01',
        views: [viewWeek],
        events: [
          {
            id: '1',
            title: 'test',
            start: '2020-01-01 04:00',
            end: '2020-01-01 06:00',
          },
        ],
      })
      customComponentFn = vi.fn()
      calendarApp._setCustomComponentFn('timeGridEvent', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(customComponentFn).toHaveBeenCalledWith(
          expect.any(Object),
          expect.any(Object)
        )
      })
    })

    it('should not render any default markup', () => {
      const eventEl = calendarEl.querySelector('.sx__event')
      expect(eventEl?.innerHTML).toBe('')
    })
  })
})

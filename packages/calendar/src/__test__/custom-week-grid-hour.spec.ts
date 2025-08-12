import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarApp from '../calendar.app'
import { createCalendar } from '../factory'
import { viewWeek } from '../views/week'
import { vi } from 'vitest'
import { waitFor } from '@testing-library/preact'

describe('Custom component for week grid hour', () => {
  let calendarApp: CalendarApp
  const calendarEl = document.createElement('div')
  document.body.appendChild(calendarEl)
  let customComponentFn = vi.fn()

  beforeEach(() => {
    calendarApp = createCalendar({
      selectedDate: Temporal.PlainDate.from('2025-03-17'),
      views: [viewWeek],
    })
    customComponentFn = vi.fn()
    calendarApp._setCustomComponentFn('weekGridHour', customComponentFn)
    calendarApp.render(calendarEl)
  })

  it('should render custom components for all the hours', async () => {
    await waitFor(() => {
      expect(customComponentFn).toHaveBeenCalledTimes(24)

      const hours = Array.from({ length: 24 }, (_, i) => i)
      hours.forEach((hour, index) => {
        const callFirstArgument = customComponentFn.mock.calls[index][0]
        const callSecondArgument = customComponentFn.mock.calls[index][1] as {
          hour: number
        }
        expect(callFirstArgument instanceof HTMLElement).toBe(true)
        expect(callSecondArgument.hour).toBe(hour)
      })
    })
  })

  it('should not render the default elements', () => {
    expect(calendarEl.querySelector('.sx__week-grid__hour-text')).toBe(null)
  })
})

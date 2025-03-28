import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarApp from '../calendar.app'
import { vi } from 'vitest'
import { createCalendar } from '../factory'
import { viewMonthGrid } from '../views/month-grid'
import { waitFor } from '@testing-library/preact'

describe('custom month grid day name', () => {
  let calendarApp: CalendarApp
  const calendarEl = document.createElement('div')
  document.body.appendChild(calendarEl)
  let customComponentFn = vi.fn()

  beforeEach(() => {
    calendarApp = createCalendar({
      selectedDate: '2025-03-17',
      views: [viewMonthGrid],
    })
    customComponentFn = vi.fn()
    calendarApp._setCustomComponentFn('monthGridDate', customComponentFn)
    calendarApp.render(calendarEl)
  })

  it('should custom components for the dates', async () => {
    await waitFor(() => {
      expect(customComponentFn).toHaveBeenCalledTimes(42)
      const expectedDates = [
        // 24 - 28
        ...Array.from({ length: 5 }, (_, i) => i + 24),

        // 1 - 31
        ...Array.from({ length: 31 }, (_, i) => i + 1),

        // 1 - 6
        ...Array.from({ length: 6 }, (_, i) => i + 1),
      ]

      expectedDates.forEach((date, index) => {
        const callFirstArgument = customComponentFn.mock.calls[index][0]
        const callSecondArgument = customComponentFn.mock.calls[index][1] as {
          date: number
        }
        expect(callFirstArgument instanceof HTMLElement).toBe(true)
        expect(callSecondArgument.date).toBe(date)
      })
    })
  })

  it('should not render the default element', () => {
    expect(calendarEl.querySelector('.sx__month-grid-day__header-date')).toBe(
      null
    )
  })
})

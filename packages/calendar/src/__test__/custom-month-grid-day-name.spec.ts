import 'temporal-polyfill/global'
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
      selectedDate: Temporal.PlainDate.from('2025-03-17'),
      views: [viewMonthGrid],
    })
    customComponentFn = vi.fn()
    calendarApp._setCustomComponentFn('monthGridDayName', customComponentFn)
    calendarApp.render(calendarEl)
  })

  it('should render custom components for the day names', async () => {
    await waitFor(() => {
      expect(customComponentFn).toHaveBeenCalledTimes(7)

      const days = [1, 2, 3, 4, 5, 6, 0]
      days.forEach((day, index) => {
        const callFirstArgument = customComponentFn.mock.calls[index][0]
        const callSecondArgument = customComponentFn.mock.calls[index][1] as {
          day: number
        }
        expect(callFirstArgument instanceof HTMLElement).toBe(true)
        expect(callSecondArgument.day).toBe(day)
      })
    })
  })

  it('should not render default element', () => {
    expect(
      calendarEl.querySelector('.sx__month-grid-day__header-day-name')
    ).toBe(null)
  })
})

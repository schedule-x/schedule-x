import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'
import { viewWeek } from '../views/week'
import { waitFor } from '@testing-library/preact'
import { vi } from 'vitest'

describe('CalendarApp', () => {
  describe('Using a custom component for the week grid date', () => {
    let calendarApp: CalendarApp
    const calendarEl = document.createElement('div')
    document.body.appendChild(calendarEl)
    let customComponentFn = vi.fn()

    beforeEach(() => {
      calendarApp = createCalendar({
        selectedDate: '2025-03-17',
        views: [viewWeek],
      })
      customComponentFn = vi.fn()
      calendarApp._setCustomComponentFn('weekGridDate', customComponentFn)
      calendarApp.render(calendarEl)
    })

    it('should call the custom component function', async () => {
      await waitFor(() => {
        expect(customComponentFn).toHaveBeenCalledTimes(7)
        const firstCall = customComponentFn.mock.calls[0]
        const callFirstArgument = firstCall[0]
        const callSecondArgument = firstCall[1] as { date: Date }
        expect(callFirstArgument instanceof HTMLElement).toBe(true)
        expect(callSecondArgument.date).toEqual(new Date(2025, 2, 17))

        const secondCall = customComponentFn.mock.calls[1]
        const secondCallFirstArgument = secondCall[0]
        const secondCallSecondArgument = secondCall[1] as { date: Date }
        expect(secondCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(secondCallSecondArgument.date).toEqual(new Date(2025, 2, 18))

        const thirdCall = customComponentFn.mock.calls[2]
        const thirdCallFirstArgument = thirdCall[0]
        const thirdCallSecondArgument = thirdCall[1] as { date: Date }
        expect(thirdCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(thirdCallSecondArgument.date).toEqual(new Date(2025, 2, 19))

        const fourthCall = customComponentFn.mock.calls[3]
        const fourthCallFirstArgument = fourthCall[0]
        const fourthCallSecondArgument = fourthCall[1] as { date: Date }
        expect(fourthCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(fourthCallSecondArgument.date).toEqual(new Date(2025, 2, 20))

        const fifthCall = customComponentFn.mock.calls[4]
        const fifthCallFirstArgument = fifthCall[0]
        const fifthCallSecondArgument = fifthCall[1] as { date: Date }
        expect(fifthCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(fifthCallSecondArgument.date).toEqual(new Date(2025, 2, 21))

        const sixthCall = customComponentFn.mock.calls[5]
        const sixthCallFirstArgument = sixthCall[0]
        const sixthCallSecondArgument = sixthCall[1] as { date: Date }
        expect(sixthCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(sixthCallSecondArgument.date).toEqual(new Date(2025, 2, 22))

        const seventhCall = customComponentFn.mock.calls[6]
        const seventhCallFirstArgument = seventhCall[0]
        const seventhCallSecondArgument = seventhCall[1] as { date: Date }
        expect(seventhCallFirstArgument instanceof HTMLElement).toBe(true)
        expect(seventhCallSecondArgument.date).toEqual(new Date(2025, 2, 23))
      })
    })

    it('should not render the default date elements', async () => {
      await waitFor(() => {
        const dateElements = calendarEl.querySelectorAll('.sx__week-grid__date')
        dateElements.forEach((dateElement) => {
          expect(
            dateElement.querySelector('.sx__week-grid__day-name')
          ).toBeNull()
          expect(
            dateElement.querySelector('.sx__week-grid__date-number')
          ).toBeNull()
        })
      })
    })
  })
})

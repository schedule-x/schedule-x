import 'temporal-polyfill/global'
import { cleanup, waitFor } from '@testing-library/preact'
import {
  describe,
  expect,
  it,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '@schedule-x/calendar/src/factory'
import { createViewWeek } from '@schedule-x/calendar/src/views/week'
import { createTimezoneSelectPlugin } from '../timezone-select-plugin.impl'
import { afterEach } from 'vitest'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

describe('TimezoneSelectPlugin', () => {
  let calendarContainer: HTMLElement

  beforeEach(() => {
    calendarContainer = document.createElement('div')
    document.body.appendChild(calendarContainer)
  })

  afterEach(() => {
    cleanup()
    if (calendarContainer.parentNode) {
      calendarContainer.parentNode.removeChild(calendarContainer)
    }
  })

  it('should render timezone select in header', async () => {
    const timezoneSelectPlugin = createTimezoneSelectPlugin()
    const calendar = createCalendar({
      selectedDate: Temporal.PlainDate.from('2024-01-15'),
      views: [createViewWeek()],
      plugins: [timezoneSelectPlugin],
    })

    calendar.render(calendarContainer)

    await waitFor(() => {
      const timezoneSelect = document.querySelector('.sx__timezone-select')
      expect(timezoneSelect).toBeTruthy()
    })
  })

  it('should display current timezone', async () => {
    const timezoneSelectPlugin = createTimezoneSelectPlugin()
    const calendar = createCalendar({
      selectedDate: Temporal.PlainDate.from('2024-01-15'),
      views: [createViewWeek()],
      plugins: [timezoneSelectPlugin],
      timezone: 'America/New_York' as IANATimezone,
    })

    calendar.render(calendarContainer)

    await waitFor(() => {
      const timezoneSelect = document.querySelector(
        '.sx__timezone-select-selected-item'
      )
      const gmtPart = timezoneSelect?.querySelector('.gmt-part')
      const timezoneName = timezoneSelect?.querySelector('.timezone-name')

      // Should display GMT part and timezone name separately
      expect(gmtPart?.textContent).toBe('GMT-4')
      expect(timezoneName?.textContent).toBe('America/New_York')
    })
  })
})

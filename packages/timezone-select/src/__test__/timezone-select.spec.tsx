import 'temporal-polyfill/global'
import { cleanup, render, waitFor } from '@testing-library/preact'
import {
  describe,
  expect,
  it,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '@schedule-x/calendar/src/factory'
import { createViewWeek } from '@schedule-x/calendar/src/views/week'
import { createTimezoneSelectPlugin, translations as timezoneSelectTranslations } from '../'
import { afterEach } from 'vitest'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'
import { stubInterface } from 'ts-sinon'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import TimezoneSelect from '../timezone-select'
import { signal } from '@preact/signals'
import { translate } from '@schedule-x/translations/src/translator/translate'
import { mergeLocales, translations } from '@schedule-x/translations/src'

const renderComponent = (timezone: IANATimezone) => {
  const $app = stubInterface<CalendarAppSingleton>()
  $app.translate = translate(signal('en-US'), signal(mergeLocales(translations, timezoneSelectTranslations))) as unknown as typeof $app.translate
  $app.config = {
    ...$app.config,
    timezone: signal(timezone),
    plugins: {
      timezoneSelect: createTimezoneSelectPlugin(),
    },
  }

  render(<TimezoneSelect $app={$app} />)
}

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

  it('should not render timezone select if plugin is not enabled', async () => {
    const timezoneSelectPlugin = createTimezoneSelectPlugin()
    timezoneSelectPlugin.setEnabled(false)

    const calendar = createCalendar({
      selectedDate: Temporal.PlainDate.from('2024-01-15'),
      views: [createViewWeek()],
    })

    calendar.render(calendarContainer)

    await waitFor(() => {
      const timezoneSelect = document.querySelector('.sx__timezone-select')
      expect(timezoneSelect).toBeFalsy()
    })
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
      expect(gmtPart?.textContent).toBe('GMT-04:00')
      expect(timezoneName?.textContent).toBe('America/New_York')
    })
  })

  describe('interacting with the select via clicks', () => {
    it('should open dropdown and select a timezone', async () => {
      renderComponent('Europe/Berlin')

      // click .sx__timezone-select-selected-item
      const timezoneSelect = document.querySelector(
        '.sx__timezone-select-selected-item'
      )
      if (!(timezoneSelect instanceof HTMLElement)) throw new Error('Timezone select not found')
      timezoneSelect.click()

      await waitFor(() => {
        const timezoneSelectDropdown = document.querySelector(
          '.sx__timezone-select-dropdown'
        )
        expect(timezoneSelectDropdown).toBeTruthy()
      })

      // click .sx__timezone-select-item
      const timezoneSelectItem = document.querySelector(
        '.sx__timezone-select-item'
      )
      if (!(timezoneSelectItem instanceof HTMLElement)) throw new Error('Timezone select item not found')
      timezoneSelectItem.click()

      await waitFor(() => {
        const timezoneSelectSelectedItem = document.querySelector(
          '.sx__timezone-select-selected-item'
        )
        expect(timezoneSelectSelectedItem?.textContent).toBe('GMT-11:00Midway')
      })
    })
  })

  describe('using the search input', () => {
    it('should filter the timezone list and navigate by keyboard', async () => {
      renderComponent('Europe/Berlin')

      // click .sx__timezone-select-selected-item
      const timezoneSelect = document.querySelector(
        '.sx__timezone-select-selected-item'
      )
      if (!(timezoneSelect instanceof HTMLElement)) throw new Error('Timezone select not found')
      timezoneSelect.click()

      await waitFor(() => {
        const timezoneSelectDropdown = document.querySelector(
          '.sx__timezone-select-dropdown'
        )
        expect(timezoneSelectDropdown).toBeTruthy()
      })

      // type 'America' into the search input
      const searchInput = document.querySelector(
        '.sx__timezone-select-search-input'
      )
      if (!(searchInput instanceof HTMLInputElement)) throw new Error('Search input not found')
      searchInput.value = 'France'
      searchInput.dispatchEvent(new Event('input'))

      await waitFor(() => {
        const timezoneSelectItems = document.querySelectorAll(
          '.sx__timezone-select-item'
        )
        expect(timezoneSelectItems.length).toBe(6)
      })

      // press down arrow key
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

      // press enter key
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      await waitFor(() => {
        const timezoneSelectSelectedItem = document.querySelector(
          '.sx__timezone-select-item'
        )
        expect(timezoneSelectSelectedItem?.textContent).toBe('GMT-04:00France – Guadeloupe')
      })
    })
  })
})

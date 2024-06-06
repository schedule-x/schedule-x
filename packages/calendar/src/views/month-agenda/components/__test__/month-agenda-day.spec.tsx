/* eslint-disable max-lines */
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, render } from '@testing-library/preact'
import MonthAgendaDay from '../month-agenda-day'
import { MonthAgendaDay as MonthAgendaDayType } from '../../types/month-agenda'
import { StateUpdater } from 'preact/hooks'
import { vi } from 'vitest'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { AppContext } from '../../../../utils/stateful/app-context'

const renderComponent = (
  $app: CalendarAppSingleton,
  day: MonthAgendaDayType,
  isActive = false,
  setActiveDate: StateUpdater<string> = vi.fn
) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthAgendaDay
        day={day}
        isActive={isActive}
        setActiveDate={setActiveDate}
      />
    </AppContext.Provider>
  )
}

const ACTIVE_DAY_SELECTOR = '.sx__month-agenda-day--active'
const DAY_SELECTOR = '.sx__month-agenda-day'

const EVENT_ICON_SELECTOR = '.sx__month-agenda-day__event-icon'
describe('MonthAgendaDay', () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  describe('the active state', () => {
    it('should have an active class', () => {
      renderComponent(
        __createAppWithViews__(),
        { date: '2020-01-01', events: [] },
        true
      )

      expect(document.querySelector(ACTIVE_DAY_SELECTOR)).not.toBeNull()
    })

    it('should not have an active class', () => {
      renderComponent(
        __createAppWithViews__(),
        { date: '2020-01-01', events: [] },
        false
      )

      expect(document.querySelector(ACTIVE_DAY_SELECTOR)).toBeNull()
    })
  })

  describe('selecting a day', () => {
    it('should call setActiveDate with the date', () => {
      const setActiveDate = vi.fn()
      const date = '2020-01-01'
      renderComponent(
        __createAppWithViews__(),
        { date, events: [] },
        false,
        setActiveDate
      )

      fireEvent.click(document.querySelector(DAY_SELECTOR) as Element)

      expect(setActiveDate).toHaveBeenCalledWith(date)
    })
  })

  describe('displaying event icons for the number of events in the day', () => {
    it('should display 0 event icons', () => {
      const $app = __createAppWithViews__({
        events: [],
      })
      renderComponent($app, {
        date: '2020-01-01',
        events: $app.calendarEvents.list.value,
      })

      expect(document.querySelectorAll(EVENT_ICON_SELECTOR).length).toBe(0)
    })

    it('should display 1 event icons', () => {
      const $app = __createAppWithViews__({
        events: [{ id: 1, start: '2020-01-01', end: '2020-01-01' }],
      })
      renderComponent($app, {
        date: '2020-01-01',
        events: $app.calendarEvents.list.value,
      })

      expect(document.querySelectorAll(EVENT_ICON_SELECTOR).length).toBe(1)
    })

    it('should display 3 event icons', () => {
      const $app = __createAppWithViews__({
        events: [
          { id: 1, start: '2020-01-01', end: '2020-01-01' },
          { id: 2, start: '2020-01-01', end: '2020-01-01' },
          { id: 3, start: '2020-01-01', end: '2020-01-01' },
        ],
      })
      renderComponent($app, {
        date: '2020-01-01',
        events: $app.calendarEvents.list.value,
      })

      expect(document.querySelectorAll(EVENT_ICON_SELECTOR).length).toBe(3)
    })

    it('should display 3 event icons even when there are more events', () => {
      const $app = __createAppWithViews__({
        events: [
          { id: 1, start: '2020-01-01', end: '2020-01-01' },
          { id: 2, start: '2020-01-01', end: '2020-01-01' },
          { id: 3, start: '2020-01-01', end: '2020-01-01' },
          { id: 4, start: '2020-01-01', end: '2020-01-01' },
        ],
      })
      renderComponent($app, {
        date: '2020-01-01',
        events: $app.calendarEvents.list.value,
      })

      expect(document.querySelectorAll(EVENT_ICON_SELECTOR).length).toBe(3)
    })
  })

  describe('setting classes for leading and trailing dates', () => {
    it('should not show any leading and trailing classes', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2021-02-01',
      })
      renderComponent($app, { date: '2021-02-01', events: [] })

      expect(document.querySelector('.is-leading-or-trailing')).toBeNull()
    })

    it('should set a class for being a leading date', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2021-04-01',
      })
      renderComponent($app, { date: '2021-03-31', events: [] })

      expect(document.querySelector('.is-leading-or-trailing')).not.toBeNull()
    })

    it('should set a class for being a trailing date', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2021-04-01',
      })
      renderComponent($app, { date: '2021-05-01', events: [] })

      expect(document.querySelector('.is-leading-or-trailing')).not.toBeNull()
    })
  })
})

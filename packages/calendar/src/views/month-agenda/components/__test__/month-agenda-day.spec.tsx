import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, render } from '@testing-library/preact'
import MonthAgendaDay from '../month-agenda-day'
import { MonthAgendaDay as MonthAgendaDayType } from '../../types/month-agenda'
import { StateUpdater } from 'preact/compat'
import { vi } from 'vitest'

const factory = (
  day: MonthAgendaDayType,
  isActive: boolean,
  setActiveDate: StateUpdater<string> = vi.fn
) => {
  render(
    <MonthAgendaDay
      day={day}
      isActive={isActive}
      setActiveDate={setActiveDate}
    />
  )
}

const ACTIVE_DAY_SELECTOR = '.sx__month-agenda-day--active'
const DAY_SELECTOR = '.sx__month-agenda-day'

describe('MonthAgendaDay', () => {
  afterEach(() => {
    cleanup()
  })

  describe('the active state', () => {
    it('should have an active class', () => {
      factory({ date: '2020-01-01', events: [] }, true)

      expect(document.querySelector(ACTIVE_DAY_SELECTOR)).not.toBeNull()
    })

    it('should not have an active class', () => {
      factory({ date: '2020-01-01', events: [] }, false)

      expect(document.querySelector(ACTIVE_DAY_SELECTOR)).toBeNull()
    })
  })

  describe('selecting a day', () => {
    it('should call setActiveDate with the date', () => {
      const setActiveDate = vi.fn()
      const date = '2020-01-01'
      factory({ date, events: [] }, false, setActiveDate)

      fireEvent.click(document.querySelector(DAY_SELECTOR) as Element)

      expect(setActiveDate).toHaveBeenCalledWith(date)
    })
  })
})

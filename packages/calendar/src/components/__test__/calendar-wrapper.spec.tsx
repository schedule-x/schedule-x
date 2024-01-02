import {
  describe,
  expect,
  it,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, waitFor } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { renderComponent } from './utils'
import { vi } from 'vitest'
import { stubInterface } from 'ts-sinon'
import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'

const CALENDAR_WRAPPER_SELECTOR = '.sx__calendar-wrapper'
const SMALL_CALENDAR_CLASS = 'sx__is-calendar-small'

describe('CalendarWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when the calendar is small (less than 700px)', () => {
    it('should have an element class of sx__is-calendar-small', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)
      $app.calendarState.isCalendarSmall.value = true

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains(SMALL_CALENDAR_CLASS)
        ).toBe(true)
      })
    })
  })

  describe('when the calendar is not small (wider than 700px)', () => {
    it('should not have an element class of sx__is-calendar-small', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)
      $app.calendarState.isCalendarSmall.value = false

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains(SMALL_CALENDAR_CLASS)
        ).toBe(false)
      })
    })
  })

  describe('when dark mode is enabled', () => {
    it('should have an element class of is-dark', async () => {
      const $app = __createAppWithViews__({
        isDark: true,
      })
      renderComponent($app)

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains('is-dark')
        ).toBe(true)
      })
    })
  })

  describe('when light mode is enabled by default', () => {
    it('should not have an element class of is-dark', async () => {
      const $app = __createAppWithViews__()
      renderComponent($app)

      await waitFor(() => {
        expect(
          document
            .querySelector(CALENDAR_WRAPPER_SELECTOR)
            ?.classList.contains('is-dark')
        ).toBe(false)
      })
    })
  })

  describe('Initializing plugins', () => {
    it('should call the "init" function of a plugin', () => {
      const plugin = {
        ...stubInterface<PluginBase>(),
        init: vi.fn(),
        name: PluginName.ScrollController,
      }
      const $app = __createAppWithViews__({
        plugins: [plugin],
      })
      renderComponent($app)

      expect(plugin.init).toHaveBeenCalled()
      expect(plugin.init).toHaveBeenCalledWith($app)
    })
  })
})

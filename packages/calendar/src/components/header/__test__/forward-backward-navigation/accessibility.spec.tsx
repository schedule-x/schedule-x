import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { cleanup, waitFor } from '@testing-library/preact'
import { getLeftChevron, getRightChevron, renderComponent } from './utils'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

const getApp = (locale: string) =>
  __createAppWithViews__({
    selectedDate: '2024-01-01',
    defaultView: InternalViewName.Week,
    locale,
  })

describe('ForwardBackwardNavigation', () => {
  afterEach(() => {
    cleanup()
  })

  describe('navigating with keyboard', () => {
    it.each([
      ['en-US', 'December 25, 2023 to December 31, 2023'],
      ['de-DE', '25. Dezember 2023 bis 31. Dezember 2023'],
    ])('should navigate backwards', async (locale, localizedRange) => {
      const $app = getApp(locale)
      renderComponent($app)

      const leftChevron = getLeftChevron()
      leftChevron.focus()
      leftChevron.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      expect($app.calendarState.range.value?.start).toBe('2023-12-25 00:00')
      const navigation = document.querySelector(
        '.sx__forward-backward-navigation'
      )
      await waitFor(() => {
        expect(navigation?.getAttribute('aria-label')).toBe(localizedRange)
      })
    })

    it.each([
      ['en-US', 'January 8, 2024 to January 14, 2024'],
      ['de-DE', '8. Januar 2024 bis 14. Januar 2024'],
    ])('should navigate forwards', async (locale, localizedRange) => {
      const $app = getApp(locale)
      renderComponent($app)

      const rightChevron = getRightChevron()
      rightChevron.focus()
      rightChevron.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      expect($app.calendarState.range.value?.start).toBe('2024-01-08 00:00')
      const navigation = document.querySelector(
        '.sx__forward-backward-navigation'
      )
      await waitFor(() => {
        expect(navigation?.getAttribute('aria-label')).toBe(localizedRange)
      })
    })
  })
})

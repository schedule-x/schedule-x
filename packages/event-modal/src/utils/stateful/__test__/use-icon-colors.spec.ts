import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { useIconColors } from '../use-icon-colors'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'

const LIGHT_MODE_COLOR = '#000'
const DARK_MODE_COLOR = 'var(--sx-color-neutral-variant)'

describe('Event modal icon colors', () => {
  describe('Changing from light- to dark mode and back', () => {
    it('should change icon color twice', () => {
      const $app = __createAppWithViews__()
      const iconColor = useIconColors($app)
      expect(iconColor.value).toBe(LIGHT_MODE_COLOR)

      $app.calendarState.isDark.value = true
      expect(iconColor.value).toBe(DARK_MODE_COLOR)

      $app.calendarState.isDark.value = false
      expect(iconColor.value).toBe(LIGHT_MODE_COLOR)
    })
  })
})

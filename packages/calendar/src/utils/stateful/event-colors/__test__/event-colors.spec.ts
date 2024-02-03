import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import EventColors from '../event-colors'
import CalendarConfigBuilder from '../../config/calendar-config.builder'

describe('EventColors', () => {
  describe('settings light colors', () => {
    it('should set the light colors on root element properties', () => {
      const config = new CalendarConfigBuilder()
        .withCalendars({
          school: {
            colorName: 'school',
            lightColors: {
              main: '#123',
              container: '#fff',
              onContainer: '#888',
            },
          },
        })
        .build()
      const eventColors = new EventColors(config)

      eventColors.setLight()

      expect(
        document.documentElement.style.getPropertyValue('--sx-color-school')
      ).toBe('#123')
      expect(
        document.documentElement.style.getPropertyValue(
          '--sx-color-school-container'
        )
      ).toBe('#fff')
      expect(
        document.documentElement.style.getPropertyValue(
          '--sx-color-on-school-container'
        )
      ).toBe('#888')
    })
  })

  describe('settings dark colors', () => {
    it('should set the dark colors on root element properties', () => {
      const config = new CalendarConfigBuilder()
        .withCalendars({
          school: {
            colorName: 'school',
            darkColors: {
              main: '#fee',
              container: '#001',
              onContainer: '#fef',
            },
          },
        })
        .build()
      const eventColors = new EventColors(config)

      eventColors.setDark()

      expect(
        document.documentElement.style.getPropertyValue('--sx-color-school')
      ).toBe('#fee')
      expect(
        document.documentElement.style.getPropertyValue(
          '--sx-color-school-container'
        )
      ).toBe('#001')
      expect(
        document.documentElement.style.getPropertyValue(
          '--sx-color-on-school-container'
        )
      ).toBe('#fef')
    })
  })
})

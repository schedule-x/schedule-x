import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { renderComponent } from './utils'

describe('Calendar wrapper', () => {
  describe('Overriding the global config', () => {
    it('should override the "calendars" option', () => {
      class CalendarsUpdaterPlugin {
        name: string = 'calendars-updater'
        $app!: CalendarAppSingleton

        init($app: CalendarAppSingleton): void {
          this.$app = $app
        }

        updateCalendars(): void {
          this.$app.config.calendars.value = {
            ...this.$app.config.calendars.value,
            personal: {
              colorName: 'personal',
              lightColors: {
                main: 'yellow',
                container: '#000',
                onContainer: 'yellow',
              },
              darkColors: {
                main: '#fff5c0',
                onContainer: '#fff5de',
                container: '#a29742',
              },
            },
          }
        }
      }
      const calendarsUpdaterPlugin = new CalendarsUpdaterPlugin()
      const $app = __createAppWithViews__({
        plugins: [calendarsUpdaterPlugin],
      })
      expect($app.config.calendars.value).toEqual({})
      renderComponent($app)

      calendarsUpdaterPlugin.updateCalendars()

      expect($app.config.calendars.value).toEqual({
        personal: {
          colorName: 'personal',
          lightColors: {
            main: 'yellow',
            container: '#000',
            onContainer: 'yellow',
          },
          darkColors: {
            main: '#fff5c0',
            onContainer: '#fff5de',
            container: '#a29742',
          },
        },
      })
    })
  })
})

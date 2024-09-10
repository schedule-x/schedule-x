import {
  describe,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'
import { createIcalendarPlugin } from '../icalendar-plugin.impl'

describe('IcalendarPluginImpl', () => {
  describe('parse plugins', () => {
    it('should parse icalendar source', () => {
      const plugin = createIcalendarPlugin()
      const $app = __createAppWithViews__({
        plugins: [plugin],
      })
      plugin.beforeInit($app)
    })
  })
})

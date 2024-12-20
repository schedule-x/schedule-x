import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { renderComponent } from './utils'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls/src'

describe('CalendarHeader', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('changing locale', () => {
    it('should update the range heading', async () => {
      const calendarControlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        selectedDate: '2022-02-10',
        plugins: [calendarControlsPlugin],
      })
      calendarControlsPlugin.beforeRender($app)
      renderComponent($app)
      const expectedRangeHeading = 'February 2022'
      const expectedRangeHeadingAfterChange = 'Februar 2022'
      expect(screen.queryByText(expectedRangeHeading)).toBeTruthy()
      expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeFalsy()

      calendarControlsPlugin.setLocale('de-DE')

      await waitFor(() => {
        expect(screen.queryByText(expectedRangeHeading)).toBeFalsy()
        expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
      })
    })
  })
})

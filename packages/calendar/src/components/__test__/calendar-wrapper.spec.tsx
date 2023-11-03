import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render, waitFor } from '@testing-library/preact'
import CalendarWrapper from '../calendar-wrapper'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'

const factory = ($app: CalendarAppSingleton) => {
  render(<CalendarWrapper $app={$app} />)
}

const CALENDAR_WRAPPER_SELECTOR = '.sx__calendar-wrapper'
const SMALL_CALENDAR_CLASS = 'sx__is-calendar-small'

describe('CalendarWrapper', () => {
  describe('when the calendar is small (less than 700px)', () => {
    it('should have an element class of sx__is-calendar-small', async () => {
      const $app = __createAppWithViews__()
      factory($app)
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
      factory($app)
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
})

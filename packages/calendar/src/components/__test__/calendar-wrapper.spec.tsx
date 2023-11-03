import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render } from '@testing-library/preact'
import CalendarWrapper from '../calendar-wrapper'
import { __createAppWithViews__ } from '../../utils/stateless/testing/__create-app-with-views__'

const factory = ($app: CalendarAppSingleton) => {
  render(<CalendarWrapper $app={$app} />)
}

describe('CalendarWrapper', () => {
  describe('when the calendar is small (less than 700px)', () => {
    it('should have an element class of sx__is-calendar-small', () => {
      const $app = __createAppWithViews__()
      $app.calendarState.isSmallScreen.value = true
      factory($app)

      expect(
        document
          .querySelector('.sx__calendar-wrapper')
          ?.classList.contains('sx__is-calendar-small')
      ).toBe(true)
    })
  })
})

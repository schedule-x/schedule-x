import {
  describe,
  it,
  afterEach,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { DayWrapper } from '../day-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<DayWrapper $app={$app} id={'randomstring'} />)
}

describe('DayWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('When an event is oen minute too long to fit in the time grid', () => {
    it('should render a date grid event but no time grid event', () => {
      const calendarEvent = {
        id: 1,
        start: '2023-10-12 00:00',
        end: '2023-10-13 00:00',
      }
      const $app = __createAppWithViews__({
        events: [calendarEvent],
        defaultView: InternalViewName.Day,
        selectedDate: '2023-10-12',
      })

      renderComponent($app)

      expect(document.querySelector('.sx__date-grid-event')).toBeTruthy()
      expect(document.querySelector('.sx__time-grid-event')).toBeFalsy()
    })
  })

  describe('When an event ends 23:59 and therefore fits in the time grid', () => {
    it('should render a time grid event but no date grid event', () => {
      const calendarEvent = {
        id: 1,
        start: '2023-10-12 00:00',
        end: '2023-10-12 23:59',
      }
      const $app = __createAppWithViews__({
        events: [calendarEvent],
        defaultView: InternalViewName.Day,
        selectedDate: '2023-10-12',
      })

      renderComponent($app)

      expect(document.querySelector('.sx__date-grid-event')).toBeFalsy()
      expect(document.querySelector('.sx__time-grid-event')).toBeTruthy()
    })
  })
})

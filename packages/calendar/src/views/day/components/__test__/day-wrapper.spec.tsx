import 'temporal-polyfill/global'
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

const DATE_GRID_EVENT = '.sx__date-grid-event'
const TIME_GRID_EVENT = '.sx__time-grid-event'

describe('DayWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('When an event is one minute too long to fit in the time grid', () => {
    it('should render a date grid event but no time grid event', () => {
      const calendarEvent = {
        id: 1,
        start: Temporal.ZonedDateTime.from('2023-10-12T00:00:00[Europe/Stockholm]'),
        end: Temporal.ZonedDateTime.from('2023-10-13T00:00:00[Europe/Stockholm]'),
      }
      const $app = __createAppWithViews__({
        events: [calendarEvent],
        defaultView: InternalViewName.Day,
        selectedDate: Temporal.PlainDate.from('2023-10-12'),
      })

      renderComponent($app)

      expect(document.querySelector(DATE_GRID_EVENT)).toBeTruthy()
      expect(document.querySelector(TIME_GRID_EVENT)).toBeFalsy()
    })
  })

  describe('When an event ends 23:59 and therefore fits in the time grid', () => {
    it('should render a time grid event but no date grid event', () => {
      const calendarEvent = {
        id: 1,
        start: Temporal.ZonedDateTime.from('2023-10-12T00:00:00[Europe/Stockholm]'),
        end: Temporal.ZonedDateTime.from('2023-10-12T23:59:00[Europe/Stockholm]'),
      }
      const $app = __createAppWithViews__({
        events: [calendarEvent],
        defaultView: InternalViewName.Day,
        selectedDate: Temporal.PlainDate.from('2023-10-12'),
      })

      renderComponent($app)

      expect(document.querySelector(DATE_GRID_EVENT)).toBeFalsy()
      expect(document.querySelector(TIME_GRID_EVENT)).toBeTruthy()
    })
  })
})

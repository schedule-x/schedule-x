import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { MonthWrapper } from '../month-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { afterEach } from 'vitest'

const factory = ($app: CalendarAppSingleton) => {
  render(<MonthWrapper $app={$app} id={'1'} />)
}

const getMonthWeek = () => document.querySelector('.sx__month-week')

const getAgendaView = () => document.querySelector('.sx__month-agenda-view')

describe('MonthWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when the calendar is not in small screen mode', () => {
    it('should render the month weeks but no agenda view', () => {
      factory(__createAppWithViews__())

      expect(getMonthWeek()).toBeTruthy()
      expect(getAgendaView()).toBeFalsy()
    })

    it('should render 6 weeks for October 2023', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      factory($app)

      expect(document.querySelectorAll('.sx__month-week').length).toBe(6)
    })
  })

  describe('when the calendar is in small screen mode', () => {
    it('should render the month agenda view but no month weeks', () => {
      const $app = __createAppWithViews__()
      $app.calendarState.isSmallScreen.value = true
      factory($app)

      expect(getAgendaView()).toBeTruthy()
      expect(getMonthWeek()).toBeFalsy()
    })
  })
})

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

describe('MonthWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering weeks for a certain month', () => {
    it('should render 6 weeks for October 2023', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      factory($app)

      expect(document.querySelectorAll('.sx__month-week').length).toBe(6)
    })
  })
})

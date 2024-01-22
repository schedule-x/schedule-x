import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { MonthGridWrapper } from '../month-grid-wrapper'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { afterEach } from 'vitest'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<MonthGridWrapper $app={$app} id={'1'} />)
}

describe('MonthWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering weeks for a certain month', () => {
    it('should render 6 weeks for October 2023', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__month-grid-week').length).toBe(6)
    })
  })

  describe('rendering the current month', () => {
    it('should highlight the current date', () => {
      renderComponent(__createAppWithViews__())
      const todaysDate = new Date().getDate()

      expect(document.querySelector('.sx__is-today')?.textContent).toBe(
        todaysDate.toString()
      )
    })
  })
})

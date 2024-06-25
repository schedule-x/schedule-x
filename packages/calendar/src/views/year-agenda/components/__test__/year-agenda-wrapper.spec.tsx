import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { afterEach } from 'vitest'
import { YearAgendaWrapper } from '../year-agenda-wrapper'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(<YearAgendaWrapper $app={$app} id={'1'} />)
}

describe('YearAgendaWrapper', () => {
  afterEach(() => {
    cleanup()
  })

  describe('rendering month for year', () => {
    it('should render 12 month for 2023', () => {
      const $app = __createAppWithViews__()
      $app.datePickerState.selectedDate.value = '2023-10-01'
      renderComponent($app)

      expect(document.querySelectorAll('.sx__year-agenda-month').length).toBe(
        12
      )
    })
  })

  describe('rendering the current month', () => {
    it('should highlight the current date', () => {
      renderComponent(__createAppWithViews__())
      const monthNumber = new Date().getMonth()
      const currentMonth = document.querySelectorAll('.sx__year-agenda-month')[
        monthNumber
      ]
      expect(
        currentMonth.querySelector('.sx__is-today')?.textContent
      ).toBeTruthy()
    })
  })
})

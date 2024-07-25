import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import DateGridDay from '../date-grid-day'
import { __createAppWithViews__ } from '../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = ($app: CalendarAppSingleton, date: string) => {
  render(
    <AppContext.Provider value={$app}>
      <DateGridDay calendarEvents={{}} date={date} />
    </AppContext.Provider>
  )
}

describe('DateGridDay', () => {
  describe('setting the data-date-grid-date attribute', () => {
    it('should set the data-date-grid-date attribute from the date prop', () => {
      const $app = __createAppWithViews__()
      const date = '2021-01-01'

      renderComponent($app, date)

      const dateGridDay = document.querySelector('.sx__date-grid-day')
      if (!(dateGridDay instanceof HTMLElement)) throw new Error('dateGridDay not found')
      expect(dateGridDay.getAttribute('data-date-grid-date')).equals(date)
    })
  })
})

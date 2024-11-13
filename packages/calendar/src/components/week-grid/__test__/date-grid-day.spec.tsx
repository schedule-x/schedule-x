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
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

const renderComponent = (
  $app: CalendarAppSingleton,
  date: string,
  backgroundEvents: BackgroundEvent[] = []
) => {
  render(
    <AppContext.Provider value={$app}>
      <DateGridDay
        calendarEvents={{}}
        date={date}
        backgroundEvents={backgroundEvents}
      />
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
      if (!(dateGridDay instanceof HTMLElement))
        throw new Error('dateGridDay not found')
      expect(dateGridDay.getAttribute('data-date-grid-date')).equals(date)
    })
  })

  describe('background events', () => {
    it('should not render any background event, if there is no full-day background event', () => {
      const $app = __createAppWithViews__()
      const date = '2021-01-01'
      const backgroundEvents: BackgroundEvent[] = [
        {
          start: '2021-01-01 00:01',
          end: '2021-01-01 23:59',
          style: {},
        },
      ]

      renderComponent($app, date, backgroundEvents)

      const backgroundEvent = document.querySelector(
        '.sx__date-grid-background-event'
      )
      expect(backgroundEvent).toBeNull()
    })

    it('should render a full-day background event if it starts and ends on the day', () => {
      const $app = __createAppWithViews__()
      const date = '2021-01-01'
      const backgroundEvents: BackgroundEvent[] = [
        {
          start: '2021-01-01',
          end: '2021-01-01',
          style: {},
        },
      ]

      renderComponent($app, date, backgroundEvents)

      const backgroundEvent = document.querySelector(
        '.sx__date-grid-background-event'
      )
      expect(backgroundEvent).not.toBeNull()
    })

    it('should render a full day event if it starts before and ends after the day', () => {
      const $app = __createAppWithViews__()
      const date = '2021-01-01'
      const backgroundEvents: BackgroundEvent[] = [
        {
          start: '2020-12-31',
          end: '2021-01-02',
          style: {},
        },
      ]

      renderComponent($app, date, backgroundEvents)

      const backgroundEvent = document.querySelector(
        '.sx__date-grid-background-event'
      )
      expect(backgroundEvent).not.toBeNull()
    })
  })
})

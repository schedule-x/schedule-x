import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import MonthAgendaEvent from '../month-agenda-event'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const factory = ($app: CalendarAppSingleton, event: CalendarEventInternal) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthAgendaEvent calendarEvent={event} />
    </AppContext.Provider>
  )
}

describe('MonthAgendaEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Displaying the event info', () => {
    const expectedTitle = 'Test Event'
    const $app = __createAppWithViews__({
      events: [
        {
          id: '1',
          title: expectedTitle,
          time: {
            start: '1999-03-12 14:45',
            end: '1999-03-12 15:45',
          },
        },
      ],
    })

    it('should display the expected title', () => {
      factory($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-agenda-event__title')?.textContent
      ).toBe(expectedTitle)
    })

    it('should display the expected time', () => {
      factory($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-agenda-event__time')?.textContent
      ).toBe('March 12, 1999 ⋅ 2:45 PM – 3:45 PM')
    })
  })
})

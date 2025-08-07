import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import MonthAgendaEvents from '../month-agenda-events'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = (
  events: CalendarEventInternal[],
  $app: CalendarAppSingleton
) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthAgendaEvents events={events} />
    </AppContext.Provider>
  )
}

describe('MonthAgendaEvents', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when there are no events', () => {
    it('should render a German message saying that there are no events for this day', () => {
      renderComponent(
        [],
        __createAppWithViews__({
          locale: 'de-DE',
        })
      )

      expect(screen.getByText('Keine Ereignisse')).not.toBeNull()
    })
  })

  describe('when there are events', () => {
    it('should render the events', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1',
            start: Temporal.ZonedDateTime.from(
              '2020-01-01T00:00:00[Europe/Stockholm]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2020-01-02T00:00:00[Europe/Stockholm]'
            ),
          },
          {
            id: '2',
            start: Temporal.ZonedDateTime.from(
              '2020-01-01T00:00:00[Europe/Stockholm]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2020-01-02T00:00:00[Europe/Stockholm]'
            ),
          },
        ],
      })
      renderComponent($app.calendarEvents.list.value, $app)

      expect(document.querySelectorAll('.sx__month-agenda-event').length).toBe(
        2
      )
    })
  })
})

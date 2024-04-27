import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { AppContext } from '../../../../utils/stateful/app-context'
import { render } from '@testing-library/preact'
import TimeGridEvent from '../../time-grid-event'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  return render(
    <AppContext.Provider value={$app}>
      <TimeGridEvent calendarEvent={calendarEvent} />
    </AppContext.Provider>
  )
}

describe('TimeGridEvent', () => {
  describe('rendering the event', () => {
    it('should have a data-event-id attribute', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Event 1',
            start: '2020-01-01 00:00',
            end: '2020-01-02 01:00',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      const timeGridEvent = document.querySelector('[data-event-id]')
      expect(timeGridEvent?.getAttribute('data-event-id')).toBe('123')
    })
  })
})

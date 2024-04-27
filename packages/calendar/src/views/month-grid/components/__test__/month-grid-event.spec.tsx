import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { AppContext } from '../../../../utils/stateful/app-context'
import MonthGridEvent from '../month-grid-event'
import { render } from '@testing-library/preact'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthGridEvent
        calendarEvent={calendarEvent}
        gridRow={0}
        date={'2020-01-01'}
      />
    </AppContext.Provider>
  )
}

describe('MonthGridEvent', () => {
  describe('render', () => {
    it('should have a data-event-id attribute', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '1234',
            start: '2020-01-01',
            end: '2020-01-02',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('[data-event-id]')?.getAttribute('data-event-id')
      ).toBe('1234')
    })
  })
})

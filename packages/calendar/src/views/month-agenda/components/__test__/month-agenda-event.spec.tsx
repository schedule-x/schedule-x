import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import MonthAgendaEvent from '../month-agenda-event'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const renderComponent = (
  $app: CalendarAppSingleton,
  event: CalendarEventInternal
) => {
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
          id: '123',
          title: expectedTitle,
          start: '1999-03-12 14:45',
          end: '1999-03-12 15:45',
        },
      ],
    })

    it('should display the expected title', () => {
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-agenda-event__title')?.textContent
      ).toBe(expectedTitle)
    })

    it('should display the expected time', () => {
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-agenda-event__time')?.textContent
      ).toBe('March 12, 1999 ⋅ 2:45 PM – 3:45 PM')
    })

    it('should have a data-event-id attribute', () => {
      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document
          .querySelector('.sx__month-agenda-event')
          ?.getAttribute('data-event-id')
      ).toBe('123')
    })
  })

  describe('displaying a fade in animation', () => {
    it('should render with a class of is-event-new', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Test Event',
            start: '1999-03-12 14:45',
            end: '1999-03-12 15:45',
          },
        ],
      })

      const calendarEventInternal = $app.calendarEvents.list.value[0]
      calendarEventInternal._createdAt = new Date()
      renderComponent($app, calendarEventInternal)

      expect(
        document.querySelector('.sx__month-agenda-event')?.classList
      ).toContain('is-event-new')
    })

    it('should render without a class of is-event-new', () => {
      const $app = __createAppWithViews__({
        events: [
          {
            id: '123',
            title: 'Test Event',
            start: '1999-03-12 14:45',
            end: '1999-03-12 15:45',
          },
        ],
      })

      renderComponent($app, $app.calendarEvents.list.value[0])

      expect(
        document.querySelector('.sx__month-agenda-event')?.classList
      ).not.toContain('is-event-new')
    })
  })
})

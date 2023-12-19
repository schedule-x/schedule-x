import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { MonthDay as MonthDayType } from '../../types/month'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import MonthGridDay from '../month-grid-day'
import { AppContext } from '../../../../utils/stateful/app-context'
import { getTestEvent } from './test-events'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

const renderComponent = ($app: CalendarAppSingleton, day: MonthDayType) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthGridDay day={day} isFirstWeek={false} />
    </AppContext.Provider>
  )
}

describe('MonthDay component', () => {
  afterEach(() => {
    cleanup()
  })

  describe('displaying an event', () => {
    const $app = __createAppWithViews__()
    const eventTitle = 'Event 1'
    const calendarEventInternal = new CalendarEventBuilder(
      $app.config,
      1,
      '2020-01-01 00:00',
      '2020-01-01 23:59'
    )
      .withTitle(eventTitle)
      .build()
    const dayWithOneEvent: MonthDayType = {
      date: '2020-01-01',
      events: {
        '0': calendarEventInternal,
      },
    }

    it('should display an event with title', () => {
      renderComponent($app, dayWithOneEvent)

      expect(screen.getByText(eventTitle)).not.toBeNull()
    })
  })

  describe('displaying less events than the limit', () => {
    const $app = __createAppWithViews__()
    const calendarEventInternal = getTestEvent($app)
    const dayWithOneEvent: MonthDayType = {
      date: '2020-01-01',
      events: {
        '0': calendarEventInternal,
      },
    }

    it('should display an event with title', () => {
      renderComponent($app, dayWithOneEvent)

      expect(
        document.querySelector('.sx__month-grid-day__events-more')
      ).toBeNull()
    })
  })

  describe('displaying one more event than the limit', () => {
    const $app = __createAppWithViews__()
    const dayWithEventLimitPlus1: MonthDayType = {
      date: '2020-01-01',
      events: {
        '0': getTestEvent($app),
        '1': getTestEvent($app),
        '2': getTestEvent($app),
        '3': getTestEvent($app),
        '4': getTestEvent($app),
      },
    }

    it('should display an event with title', () => {
      renderComponent($app, dayWithEventLimitPlus1)

      expect(
        document.querySelector('.sx__month-grid-day__events-more')
      ).not.toBeNull()
      expect(screen.getByText('+ 1 event')).not.toBeNull()
    })
  })

  describe('displaying 2 more events than the limit', () => {
    const $app = __createAppWithViews__()
    const dayWithEventLimitPlus2: MonthDayType = {
      date: '2020-01-01',
      events: {
        '0': getTestEvent($app),
        '1': getTestEvent($app),
        '2': getTestEvent($app),
        '3': getTestEvent($app),
        '4': getTestEvent($app),
        '5': getTestEvent($app),
      },
    }

    it('should display an event with title', () => {
      renderComponent($app, dayWithEventLimitPlus2)

      expect(
        document.querySelector('.sx__month-grid-day__events-more')
      ).not.toBeNull()
      expect(screen.getByText('+ 2 events')).not.toBeNull()
    })

    it('should navigate to day view when clicking on the more events button', async () => {
      renderComponent($app, dayWithEventLimitPlus2)
      expect($app.calendarState.view.value).toBe(InternalViewName.Week)

      const moreEventsButton = document.querySelector(
        '.sx__month-grid-day__events-more'
      )
      moreEventsButton?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )

      await waitFor(() => {
        expect($app.calendarState.view.value).toBe(InternalViewName.Day)
      })
    })
  })
})

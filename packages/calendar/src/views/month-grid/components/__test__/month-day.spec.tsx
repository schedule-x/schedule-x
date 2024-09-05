/* eslint-disable max-lines */
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
import { beforeEach, vi } from 'vitest'

const renderComponent = ($app: CalendarAppSingleton, day: MonthDayType) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthGridDay day={day} isFirstWeek={false} isLastWeek={false} />
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
      backgroundEvents: [],
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
      backgroundEvents: [],
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
      backgroundEvents: [],
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
    const onClickPlusEvents = vi.fn()
    const onClickDate = vi.fn()
    const $app = __createAppWithViews__({
      callbacks: {
        onClickPlusEvents,
        onClickDate,
      },
    })
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
      backgroundEvents: [],
    }

    it('should display an event with title', () => {
      renderComponent($app, dayWithEventLimitPlus2)

      expect(
        document.querySelector('.sx__month-grid-day__events-more')
      ).not.toBeNull()
      expect(screen.getByText('+ 2 events')).not.toBeNull()
    })

    it('should call the callback for clicking the "+ N events"-button', () => {
      renderComponent($app, dayWithEventLimitPlus2)
      const moreEventsButton = document.querySelector(
        '.sx__month-grid-day__events-more'
      )

      expect(onClickPlusEvents).not.toHaveBeenCalled()
      moreEventsButton?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )

      expect(onClickPlusEvents).toHaveBeenCalledWith(
        dayWithEventLimitPlus2.date
      )
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

    it('should not propagate click to the day, when clicking on the more events button', () => {
      renderComponent($app, dayWithEventLimitPlus2)
      const moreEventsButton = document.querySelector(
        '.sx__month-grid-day__events-more'
      )
      moreEventsButton?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )

      expect(onClickDate).not.toHaveBeenCalled()
    })
  })

  describe('configuring number of events to display', () => {
    const $app = __createAppWithViews__({
      monthGridOptions: {
        nEventsPerDay: 6,
      },
    })
    const day: MonthDayType = {
      date: '2020-01-01',
      events: {
        '0': getTestEvent($app),
        '1': getTestEvent($app),
        '2': getTestEvent($app),
        '3': getTestEvent($app),
        '4': getTestEvent($app),
        '5': getTestEvent($app),
        '6': getTestEvent($app),
        '7': getTestEvent($app),
      },
      backgroundEvents: [],
    }

    it('should display 6 events', () => {
      renderComponent($app, day)

      expect(document.querySelectorAll('.sx__month-grid-event').length).toBe(6)
    })

    it('should say 2 plus events in the butotn', () => {
      renderComponent($app, day)

      expect(
        document.querySelector('.sx__month-grid-day__events-more')
      ).not.toBeNull()
      expect(screen.getByText('+ 2 events')).not.toBeNull()
    })
  })

  describe('leading and trailing dates', () => {
    let $app: CalendarAppSingleton
    let day: MonthDayType

    beforeEach(() => {
      $app = __createAppWithViews__({
        selectedDate: '2020-01-01',
      })
      day = {
        date: '2020-01-01',
        events: {},
        backgroundEvents: [],
      }
    })

    it('should not have the class "is-leading-or-trailing" when day is in selected month', () => {
      renderComponent($app, day)

      expect(document.querySelector('.is-leading-or-trailing')).toBeNull()
    })

    it('should have the class "is-leading-or-trailing" when day is in month previous to selected month', () => {
      day.date = '2019-12-31'
      renderComponent($app, day)

      expect(document.querySelector('.is-leading-or-trailing')).not.toBeNull()
    })

    it('should have the class "is-leading-or-trailing" when day is in month after selected month', () => {
      day.date = '2020-02-01'
      renderComponent($app, day)

      expect(document.querySelector('.is-leading-or-trailing')).not.toBeNull()
    })
  })

  describe('getting the aria label for the more events button', () => {
    it.each([
      [
        'de-DE',
        '+ 1 Ereignis',
        'Link zu 1 weiteren Ereignis am 1. Januar 2020',
      ],
      ['en-US', '+ 1 event', 'Link to 1 more event on January 1, 2020'],
      ['es-ES', '+ 1 evento', 'Enlace a 1 evento más el 1 de enero de 2020'],
      [
        'fr-FR',
        '+ 1 événement',
        'Lien vers 1 autre événement le 1 janvier 2020',
      ],
    ])(
      'should return the singular translation',
      (locale, buttonText, expectedAriaLabel) => {
        const $app = __createAppWithViews__({
          locale: locale,
        })
        const day: MonthDayType = {
          date: '2020-01-01',
          events: {
            '0': getTestEvent($app),
            '1': getTestEvent($app),
            '2': getTestEvent($app),
            '3': getTestEvent($app),
            '4': getTestEvent($app),
          },
          backgroundEvents: [],
        }

        renderComponent($app, day)

        expect(screen.getByText(buttonText).getAttribute('aria-label')).toBe(
          expectedAriaLabel
        )
      }
    )
  })

  // see: https://github.com/schedule-x/schedule-x/issues/559
  // there might be a way to improve this, if the events are sorted again in each month-week, only considering each event's
  // start and end dates within that week, as compared to considering their original start and end dates
  // this will mean having to rewrite large chunks of the current positioning algorithm though
  describe('having a day with undefined events occupying visible slots and still having more events to show', () => {
    it('should show correct number of extra events', () => {
      const $app = __createAppWithViews__()
      const day: MonthDayType = {
        date: '2020-01-01',
        events: {
          '0': undefined,
          '1': undefined,
          '2': undefined,
          '3': getTestEvent($app),
          '4': getTestEvent($app),
          '5': getTestEvent($app),
        },
        backgroundEvents: [],
      }

      renderComponent($app, day)

      expect(screen.getByText('+ 2 events')).not.toBeNull()
    })
  })
})

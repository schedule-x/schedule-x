/* eslint-disable max-lines */
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent } from '@testing-library/preact'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { renderComponent } from './utils'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { vi } from 'vitest'

describe('TimeGridDay', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a non-hybrid day', () => {
    const $app = __createAppWithViews__({
      selectedDate: '2023-09-11',
    })

    it('renders an event at 00:00', () => {
      const eventTime = {
        start: '2023-09-11 00:00',
        end: '2023-09-11 01:00',
      }
      renderComponent(
        $app,
        [
          new CalendarEventBuilder(
            $app.config,
            '1',
            eventTime.start,
            eventTime.end
          ).build(),
        ],
        '2023-09-11'
      )

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 0%')
    })

    it('renders an event at 18:00', () => {
      const eventTime = {
        start: '2023-09-11 18:00',
        end: '2023-09-11 19:00',
      }
      renderComponent(
        $app,
        [
          new CalendarEventBuilder(
            $app.config,
            '1',
            eventTime.start,
            eventTime.end
          ).build(),
        ],
        '2023-09-11'
      )

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 75%')
    })

    it('fires onClickDateTime if the user clicks on the day', () => {
      const onClickDateTime = vi.fn()
      const $app = __createAppWithViews__({
        selectedDate: '2023-09-11',
        callbacks: {
          onClickDateTime,
        },
      })
      renderComponent($app, [], '2023-09-11')

      const dayElement = document.querySelector('.sx__time-grid-day')
      fireEvent.click(dayElement as Element)

      expect(onClickDateTime).toHaveBeenCalled()
    })

    it('does not fire onClickDateTime if the user clicks on a child element', () => {
      const onClickDateTime = vi.fn()
      const $app = __createAppWithViews__({
        selectedDate: '2023-09-11',
        callbacks: {
          onClickDateTime,
        },
        events: [
          {
            start: '2023-09-11 00:00',
            end: '2023-09-11 01:00',
            id: '1',
          },
        ],
      })
      renderComponent($app, $app.calendarEvents.list.value, '2023-09-11')

      const dayElement = document.querySelector('.sx__time-grid-day') as Element
      const eventElement = document.querySelector('.sx__event') as Element
      fireEvent.mouseDown(eventElement)
      fireEvent.click(dayElement)

      expect(onClickDateTime).not.toHaveBeenCalled()
    })
  })

  describe('a hybrid day', () => {
    const $app = __createAppWithViews__({
      selectedDate: '2023-09-11',
      dayBoundaries: {
        start: '18:00',
        end: '06:00',
      },
    })

    it('renders an event at 00:00', () => {
      const eventTime = {
        start: '2023-09-12 00:00',
        end: '2023-09-12 01:00',
      }
      renderComponent(
        $app,
        [
          new CalendarEventBuilder(
            $app.config,
            '1',
            eventTime.start,
            eventTime.end
          ).build(),
        ],
        '2023-09-12'
      )

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 50%')
    })
  })

  describe('rendering the week day class', () => {
    it('renders the week day class', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-09-11',
      })
      renderComponent($app, [], '2023-09-11')

      expect(document.querySelector('.sx__time-grid-day')?.classList).toContain(
        'sx__monday'
      )
    })
  })

  describe('background events', () => {
    it('renders a full height background event for event that matches date', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-09-11',
      })
      renderComponent($app, [], '2023-09-11', [
        {
          start: '2023-09-11',
          end: '2023-09-11',
          style: {},
        },
      ])

      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 0%')
      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('height: 99.93055555555557%')
    })

    it('renders a full height background event for event that starts before date and ends after', () => {
      const $app = __createAppWithViews__({
        selectedDate: '2023-09-11',
      })
      renderComponent($app, [], '2023-09-11', [
        {
          start: '2023-09-10',
          end: '2023-09-12',
          style: {},
        },
      ])

      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 0%')
      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('height: 99.93055555555557%')
    })
  })
})

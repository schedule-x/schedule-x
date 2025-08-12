/* eslint-disable max-lines */
import 'temporal-polyfill/global'
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
      selectedDate: Temporal.PlainDate.from('2023-09-11'),
    })

    it('renders an event at 00:00', () => {
      const eventTime = {
        start: Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-11T01:00:00.00+00:00[UTC]'),
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
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]')
      )

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 0%')
    })

    it('renders an event at 18:00', () => {
      const eventTime = {
        start: Temporal.ZonedDateTime.from('2023-09-11T18:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-11T19:00:00.00+00:00[UTC]'),
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
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]')
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
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
        callbacks: {
          onClickDateTime,
        },
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]')
      )

      const dayElement = document.querySelector(
        '.sx__time-grid-day'
      ) as HTMLElement
      Object.defineProperty(dayElement, 'getBoundingClientRect', {
        value: () => ({
          height: 100,
          top: 10,
        }),
      })
      fireEvent.click(dayElement as Element)

      expect(onClickDateTime).toHaveBeenCalled()
    })

    it('does not fire onClickDateTime if the user clicks on a child element', () => {
      const onClickDateTime = vi.fn()
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
        callbacks: {
          onClickDateTime,
        },
        events: [
          {
            start: Temporal.ZonedDateTime.from(
              '2023-09-11T00:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2023-09-11T01:00:00.00+00:00[UTC]'
            ),
            id: '1',
          },
        ],
      })
      renderComponent(
        $app,
        $app.calendarEvents.list.value,
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]')
      )

      const dayElement = document.querySelector('.sx__time-grid-day') as Element
      const eventElement = document.querySelector('.sx__event') as Element
      fireEvent.mouseDown(eventElement)
      fireEvent.click(dayElement)

      expect(onClickDateTime).not.toHaveBeenCalled()
    })
  })

  describe('a hybrid day', () => {
    const $app = __createAppWithViews__({
      selectedDate: Temporal.PlainDate.from('2023-09-11'),
      dayBoundaries: {
        start: '18:00',
        end: '06:00',
      },
    })

    it('renders an event at 00:00', () => {
      const eventTime = {
        start: Temporal.ZonedDateTime.from('2023-09-12T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-09-12T01:00:00.00+00:00[UTC]'),
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
        Temporal.ZonedDateTime.from('2023-09-12T00:00:00.00+00:00[UTC]')
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
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]')
      )

      expect(document.querySelector('.sx__time-grid-day')?.classList).toContain(
        'sx__monday'
      )
    })
  })

  describe('background events', () => {
    it('renders a full height background event for event that matches date', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        [
          {
            start: Temporal.ZonedDateTime.from(
              '2023-09-11T00:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2023-09-11T23:59:00.00+00:00[UTC]'
            ),
            style: {},
          },
        ]
      )

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
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        [
          {
            start: Temporal.ZonedDateTime.from(
              '2023-09-10T00:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2023-09-12T23:59:00.00+00:00[UTC]'
            ),
            style: {},
          },
        ]
      )

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

    it('does not render a background event, if the background event ends on the start time of the day', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
        dayBoundaries: {
          start: '06:00',
          end: '23:00',
        },
        timezone: 'UTC',
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        [
          {
            start: Temporal.ZonedDateTime.from(
              '2023-09-11T05:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2023-09-11T06:00:00.00+00:00[UTC]'
            ),
            style: {},
          },
        ]
      )

      expect(
        document.querySelector('.sx__time-grid-background-event')
      ).toBeNull()
    })

    it('should render a timed background event that starts on the previous day', () => {
      const $app = __createAppWithViews__({
        selectedDate: Temporal.PlainDate.from('2023-09-11'),
      })
      renderComponent(
        $app,
        [],
        Temporal.ZonedDateTime.from('2023-09-11T00:00:00.00+00:00[UTC]'),
        [
          {
            start: Temporal.ZonedDateTime.from(
              '2023-09-10T00:00:00.00+00:00[UTC]'
            ),
            end: Temporal.ZonedDateTime.from(
              '2023-09-11T12:00:00.00+00:00[UTC]'
            ),
            style: {},
          },
        ]
      )

      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 0%')
      expect(
        document
          .querySelector('.sx__time-grid-background-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('height: 50%')
    })
  })
})

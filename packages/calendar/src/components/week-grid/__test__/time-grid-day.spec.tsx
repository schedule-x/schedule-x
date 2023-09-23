import {
  afterEach,
  describe,
  expect,
  it,
} from '../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendarAppSingleton } from '../../../factory'
import CalendarAppSingleton from '../../../utils/stateful/app-singleton/calendar-app-singleton'
import { cleanup, render } from '@testing-library/preact'
import TimeGridDay from '../time-grid-day'
import { AppContext } from '../../../utils/stateful/app-context'
import { CalendarEventInternal } from '../../../utils/stateful/calendar-event/calendar-event.interface'
import CalendarEventBuilder from '../../../utils/stateful/calendar-event/calendar-event.builder'

const factory = (
  $app: CalendarAppSingleton,
  calendarEvents: CalendarEventInternal[]
) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeGridDay calendarEvents={calendarEvents} />
    </AppContext.Provider>
  )
}

describe('TimeGridDay', () => {
  afterEach(() => {
    cleanup()
  })

  describe('a non-hybrid day', () => {
    const $app = createCalendarAppSingleton({
      datePicker: { selectedDate: '2023-09-11' },
    })

    it('renders an event at 00:00', () => {
      const eventTime = {
        start: '2023-09-11 00:00',
        end: '2023-09-11 01:00',
      }
      factory($app, [
        new CalendarEventBuilder($app.config, '1', eventTime).build(),
      ])

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
      factory($app, [
        new CalendarEventBuilder($app.config, '1', eventTime).build(),
      ])

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 75%')
    })
  })

  describe('a hybrid day', () => {
    const $app = createCalendarAppSingleton({
      datePicker: { selectedDate: '2023-09-11' },
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
      factory($app, [
        new CalendarEventBuilder($app.config, '1', eventTime).build(),
      ])

      expect(
        document
          .querySelector('.sx__time-grid-event')
          ?.attributes.getNamedItem('style')?.value
      ).toContain('top: 50%')
    })
  })
})

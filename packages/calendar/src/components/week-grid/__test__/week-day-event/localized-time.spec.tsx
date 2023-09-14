import {
  afterEach,
  describe,
  expect,
  it,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import CalendarEventBuilder from '../../../../utils/stateful/calendar-event/calendar-event.builder'
import { createCalendarAppSingleton } from '../../../../factory'
import { factory } from './utils'

describe('WeekDayEvent', () => {
  afterEach(() => {
    cleanup()
  })

  describe('displaying localized time', () => {
    it.each([
      ['en-US', '10:00 AM – 11:00 AM'],
      ['en-GB', '10:00 – 11:00'],
      ['de-DE', '10:00 – 11:00'],
      ['zh-CN', '10:00 – 11:00'],
    ])(
      'should display the time for an event in %s locale',
      (locale: string, expectedTime: string) => {
        const $app = createCalendarAppSingleton({
          datePicker: {
            selectedDate: '2020-12-01',
          },
          locale,
        })
        const calendarEvent = new CalendarEventBuilder($app.config, '1', {
          start: '2020-12-01 10:00',
          end: '2020-12-01 11:00',
        }).build()
        factory($app, calendarEvent)

        expect(screen.queryByText(expectedTime)).toBeTruthy()
      }
    )
  })
})

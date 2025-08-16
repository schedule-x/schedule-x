import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import { renderComponent } from './utils'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { vi } from 'vitest'

const resizeObserver = class ResizeObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

window.ResizeObserver = resizeObserver

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
        const $app = __createAppWithViews__({
          selectedDate: Temporal.PlainDate.from('2020-12-01'),
          locale,
        })
        const calendarEvent = new CalendarEventBuilder(
          $app.config,
          '1',
          Temporal.ZonedDateTime.from('2020-12-01T10:00:00[UTC]'),
          Temporal.ZonedDateTime.from('2020-12-01T11:00:00[UTC]')
        ).build()
        renderComponent($app, calendarEvent)

        expect(screen.queryByText(expectedTime)).toBeTruthy()
      }
    )
  })
})

import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import TimeAxis from '../time-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../utils/stateless/testing/__create-app-with-views__'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls/src'

const renderComponent = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <TimeAxis />
    </AppContext.Provider>
  )
}

describe('TimeAxis', () => {
  afterEach(() => {
    cleanup()
  })

  describe('displaying default time axis', () => {
    it('should display all hours in en-US locale', () => {
      renderComponent(__createAppWithViews__())
      for (const ampm of ['AM', 'PM']) {
        for (let hour = 1; hour <= 12; ++hour) {
          expect(screen.getByText(`${hour} ${ampm}`)).not.toBeNull()
        }
      }
    })
  })

  describe('displaying time axis in de-DE', () => {
    it('should display all hours as "xx Uhr"', () => {
      renderComponent(__createAppWithViews__({ locale: 'de-DE' }))
      for (let hour = 0; hour < 24; ++hour) {
        expect(
          screen.getByText(hour.toString().padStart(2, '0') + ' Uhr')
        ).not.toBeNull()
      }
    })
  })

  describe('displaying time axis with custom timeAxisFormatOptions', () => {
    it('should display all hours as xx:00', () => {
      renderComponent(
        __createAppWithViews__({
          dayBoundaries: {
            start: '01:00',
            end: '23:59',
          },
          weekOptions: {
            timeAxisFormatOptions: {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            },
          },
        })
      )
      for (let hour = 1; hour < 24; ++hour) {
        expect(
          screen.getByText(hour.toString().padStart(2, '0') + ':00')
        ).not.toBeNull()
      }
    })
  })

  describe('changing the day boundaries of the calendar', () => {
    it('should respect the day boundary configuration of the calendar', async () => {
      const calendarControlsPlugin = createCalendarControlsPlugin()
      const $app = __createAppWithViews__({
        plugins: [calendarControlsPlugin],
        locale: 'de-DE',
      })
      renderComponent($app)
      calendarControlsPlugin.beforeInit?.($app)
      for (let hour = 0; hour <= 23; ++hour) {
        expect(
          screen.getByText(`${hour.toString().padStart(2, '0')} Uhr`)
        ).not.toBeNull()
      }

      calendarControlsPlugin.setDayBoundaries({ start: '08:00', end: '17:00' })

      // We need to wait for the re-render here for the time axis to show the correct times
      await waitFor(() => {
        for (let hour = 0; hour <= 23; hour++) {
          const query = `${hour.toString().padStart(2, '0')} Uhr`
          if (hour >= 8 && hour <= 16) {
            expect(screen.queryByText(query)).not.toBeNull()
          } else {
            expect(screen.queryByText(query)).toBeNull()
          }
        }
      })
    })
  })
})

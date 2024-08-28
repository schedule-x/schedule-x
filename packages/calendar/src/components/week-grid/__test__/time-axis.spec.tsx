import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import TimeAxis from '../time-axis'
import { AppContext } from '../../../utils/stateful/app-context'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { __createAppWithViews__ } from '../../../utils/stateless/testing/__create-app-with-views__'

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
          weekOptions: {
            timeAxisFormatOptions: {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            },
          },
        })
      )
      for (let hour = 0; hour < 24; ++hour) {
        expect(
          screen.getByText(hour.toString().padStart(2, '0') + ':00')
        ).not.toBeNull()
      }
    })
  })
})

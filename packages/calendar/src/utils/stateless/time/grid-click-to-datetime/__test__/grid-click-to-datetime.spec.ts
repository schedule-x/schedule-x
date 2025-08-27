import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../testing/__create-app-with-views__'
import { getClickDateTime } from '../grid-click-to-datetime'
import { cleanup } from '@testing-library/preact'
import 'temporal-polyfill/global'

describe('Getting a date time from clicking the time grid', () => {
  describe('When there are 2400 time points per day', () => {
    let dayGridElement: HTMLDivElement

    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 100, // Day starts 100px down from window top
          height: 2400,
        } as DOMRect
      }
      dayGridElement = document.createElement('div')
      dayGridElement.classList.add('sx__time-grid-day')
    })

    afterEach(() => {
      cleanup()
    })

    it('should return the correct date time, 1 hour into day', () => {
      const e = {
        clientY: 200, // 100px into day
        target: dayGridElement,
      }
      const $app = __createAppWithViews__()

      const result = getClickDateTime(
        e as unknown as MouseEvent,
        $app,
        Temporal.ZonedDateTime.from('2020-01-01T00:00:00+01:00[Europe/Berlin]')
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-01-01T01:00:00+01:00[Europe/Berlin]')
      )
    })

    it('should return the correct date time, 12 hours 30 minutes into day', () => {
      const e = {
        clientY: 1350,
        target: dayGridElement,
      } as unknown as MouseEvent
      const $app = __createAppWithViews__()

      const result = getClickDateTime(
        e,
        $app,
        Temporal.ZonedDateTime.from('2020-01-01T00:00:00+01:00[Europe/Berlin]')
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-01-01T12:30:00+01:00[Europe/Berlin]')
      )
    })

    it('should return the correct date time, 23 hours 59 minutes into day', () => {
      const e = {
        clientY: 2499,
        target: dayGridElement,
      } as unknown as MouseEvent
      const $app = __createAppWithViews__()

      const result = getClickDateTime(
        e,
        $app,
        Temporal.ZonedDateTime.from('2020-01-01T00:00:00+01:00[Europe/Berlin]')
      )

      expect(result).toEqual(
        Temporal.ZonedDateTime.from('2020-01-01T23:59:00+01:00[Europe/Berlin]')
      )
    })
  })
})

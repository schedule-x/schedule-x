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
        '2020-01-01 00:00'
      )

      expect(result).toBe('2020-01-01 01:00')
    })

    it('should return the correct date time, 12 hours 30 minutes into day', () => {
      const e = {
        clientY: 1350,
        target: dayGridElement,
      } as unknown as MouseEvent
      const $app = __createAppWithViews__()

      const result = getClickDateTime(e, $app, '2020-01-01 00:00')

      expect(result).toBe('2020-01-01 12:30')
    })

    it('should return the correct date time, 23 hours 59 minutes into day', () => {
      const e = {
        clientY: 2499,
        target: dayGridElement,
      } as unknown as MouseEvent
      const $app = __createAppWithViews__()

      const result = getClickDateTime(e, $app, '2020-01-01 00:00')

      expect(result).toBe('2020-01-01 23:59')
    })
  })
})

import {
  describe,
  it,
  expect,
  beforeEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../testing/__create-app-with-views__'
import { getClickDateTime } from '../grid-click-to-datetime'

describe('Getting a date time from clicking the time grid', () => {
  describe('When there are 2400 time points per day', () => {
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 100, // Day starts 100px down from window top
          height: 2400,
        } as any
      }
    })

    it('should return the correct date time, 1 hour into day', () => {
      const e = {
        clientY: 200, // 100px into day
        target: document.createElement('div'),
      }
      const $app = __createAppWithViews__()

      const result = getClickDateTime(e as any, $app, '2020-01-01 00:00')

      expect(result).toBe('2020-01-01 01:00')
    })

    it('should return the correct date time, 12 hours 30 minutes into day', () => {
      const e = {
        clientY: 1350,
        target: document.createElement('div'),
      }
      const $app = __createAppWithViews__()

      const result = getClickDateTime(e as any, $app, '2020-01-01 00:00')

      expect(result).toBe('2020-01-01 12:30')
    })

    it('should return the correct date time, 23 hours 59 minutes into day', () => {
      const e = {
        clientY: 2499,
        target: document.createElement('div'),
      }
      const $app = __createAppWithViews__()

      const result = getClickDateTime(e as any, $app, '2020-01-01 00:00')

      expect(result).toBe('2020-01-01 23:59')
    })
  })
})

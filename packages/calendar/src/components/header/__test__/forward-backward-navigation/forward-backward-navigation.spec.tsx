import {
  afterEach,
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { clickNext, clickPrevious, renderComponent } from './utils'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

describe('ForwardBackwardNavigation', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when in month view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.MonthGrid,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2023-01-30 00:00',
        end: '2023-03-05 23:59',
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.MonthGrid,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2022-11-28 00:00',
        end: '2023-01-01 23:59',
      })
    })
  })

  describe('when in week view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.Week,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2023-01-02 00:00',
        end: '2023-01-08 23:59',
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.Week,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2022-12-19 00:00',
        end: '2022-12-25 23:59',
      })
    })
  })

  describe('when in day view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.Day,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2023-01-02 00:00',
        end: '2023-01-02 23:59',
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = __createAppWithViews__({
        defaultView: InternalViewName.Day,
        callbacks: {
          onRangeUpdate: onRangeUpdate,
        },
        selectedDate: '2023-01-01',
      })
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: '2022-12-31 00:00',
        end: '2022-12-31 23:59',
      })
    })
  })
})

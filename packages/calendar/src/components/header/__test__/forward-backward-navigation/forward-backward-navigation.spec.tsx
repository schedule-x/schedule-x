import 'temporal-polyfill/global'
import {
  afterEach,
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { clickNext, clickPrevious, renderComponent } from './utils'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

const getApp = (onRangeUpdate: () => void, defaultView: InternalViewName) =>
  __createAppWithViews__({
    defaultView,
    callbacks: {
      onRangeUpdate: onRangeUpdate,
    },
    selectedDate: Temporal.PlainDate.from('2023-01-01'),
  })

describe('ForwardBackwardNavigation', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when in month view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.MonthGrid)
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2023-01-30T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-03-05T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.MonthGrid)
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2022-11-28T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-01-01T23:59:00.00+00:00[UTC]'),
      })
    })
  })

  describe('when in week view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.Week)
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2023-01-02T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-01-08T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.Week)
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2022-12-19T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2022-12-25T23:59:00.00+00:00[UTC]'),
      })
    })
  })

  describe('when in day view', () => {
    it('should navigate forwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.Day)
      renderComponent($app)

      clickNext()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2023-01-02T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2023-01-02T23:59:00.00+00:00[UTC]'),
      })
    })

    it('should navigate backwards', () => {
      const onRangeUpdate = vi.fn()
      const $app = getApp(onRangeUpdate, InternalViewName.Day)
      renderComponent($app)

      clickPrevious()

      expect(onRangeUpdate).toHaveBeenCalledTimes(1)
      expect(onRangeUpdate).toHaveBeenCalledWith({
        start: Temporal.ZonedDateTime.from('2022-12-31T00:00:00.00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2022-12-31T23:59:00.00+00:00[UTC]'),
      })
    })
  })
})

import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { getLeftChevron, getRightChevron, renderComponent } from './utils'
import { assertElementType } from '../../../../../../../libs/assertions/src'
import { cleanup, fireEvent, waitFor } from '@testing-library/preact'

describe('Forward backward navigation', () => {
  afterEach(() => {
    cleanup()
  })

  describe('When max date prevents navigating to later dates', () => {
    it('should disable the "next"-chevron button', () => {
      const $app = __createAppWithViews__({
        minDate: Temporal.PlainDate.from('2024-01-01'),
        maxDate: Temporal.PlainDate.from('2024-03-31'),
        defaultView: 'month-grid',
        selectedDate: Temporal.PlainDate.from('2024-03-31'),
      })
      renderComponent($app)

      const rightChevron = getRightChevron()
      assertElementType<HTMLButtonElement>(rightChevron, HTMLButtonElement)
      expect(rightChevron.disabled).toBe(true)
      const leftChevron = getLeftChevron()
      assertElementType<HTMLButtonElement>(leftChevron, HTMLButtonElement)
      expect(leftChevron.disabled).toBe(false)
    })
  })

  describe('When min date prevents navigating to earlier dates in month view', () => {
    it('should disable the "previous"-chevron button', () => {
      const $app = __createAppWithViews__({
        minDate: Temporal.PlainDate.from('2024-01-01'),
        maxDate: Temporal.PlainDate.from('2024-03-31'),
        defaultView: 'month-grid',
        selectedDate: Temporal.PlainDate.from('2024-01-01'),
      })
      renderComponent($app)

      const rightChevron = getRightChevron()
      assertElementType<HTMLButtonElement>(rightChevron, HTMLButtonElement)
      expect(rightChevron.disabled).toBe(false)
      const leftChevron = getLeftChevron()
      assertElementType<HTMLButtonElement>(leftChevron, HTMLButtonElement)
      expect(leftChevron.disabled).toBe(true)
    })
  })

  describe('When min date prevents navigating to earlier dates in week view', () => {
    it('should disable the "previous"-chevron button', async () => {
      const $app = __createAppWithViews__({
        minDate: Temporal.PlainDate.from('2024-01-06'),
        defaultView: 'week',
        selectedDate: Temporal.PlainDate.from('2024-01-08'),
      })
      renderComponent($app)

      const leftChevron = getLeftChevron()
      assertElementType<HTMLButtonElement>(leftChevron, HTMLButtonElement)
      expect(leftChevron.disabled).toBe(false)
      const rightChevron = getRightChevron()
      assertElementType<HTMLButtonElement>(rightChevron, HTMLButtonElement)
      expect(rightChevron.disabled).toBe(false)

      fireEvent.mouseUp(leftChevron)
      await waitFor(() => {
        expect(leftChevron.disabled).toBe(true)
        expect(rightChevron.disabled).toBe(false)
      })
    })
  })

  describe('When max date prevents navigating to later dates in day view', () => {
    it('should disable the "next"-chevron button', async () => {
      const $app = __createAppWithViews__({
        maxDate: Temporal.PlainDate.from('2024-03-31'),
        defaultView: 'day',
        selectedDate: Temporal.PlainDate.from('2024-03-30'),
      })
      renderComponent($app)

      const rightChevron = getRightChevron()

      assertElementType<HTMLButtonElement>(rightChevron, HTMLButtonElement)
      expect(rightChevron.disabled).toBe(false)
      fireEvent.mouseUp(rightChevron)

      await waitFor(() => {
        expect(rightChevron.disabled).toBe(true)
      })
    })
  })
})

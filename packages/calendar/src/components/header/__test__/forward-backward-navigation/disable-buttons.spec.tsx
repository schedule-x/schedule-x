import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'
import { getLeftChevron, getRightChevron, renderComponent } from './utils'
import { assertElementType } from '@schedule-x/assertions'
import { cleanup } from '@testing-library/preact'

describe('Forward backward navigation', () => {
  afterEach(() => {
    cleanup()
  })

  describe('When max date prevents navigating to later dates', () => {
    it('should disable the "next"-chevron button', () => {
      const $app = __createAppWithViews__({
        minDate: '2024-01-01',
        maxDate: '2024-03-31',
        defaultView: 'month-grid',
        selectedDate: '2024-03-31',
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

  describe('When min date prevents navigating to earlier dates', () => {
    it('should disable the "previous"-chevron button', () => {
      const $app = __createAppWithViews__({
        minDate: '2024-01-01',
        maxDate: '2024-03-31',
        defaultView: 'month-grid',
        selectedDate: '2024-01-01',
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
})

import {
  describe,
  it,
  expect,
  beforeEach,
  mockFn,
} from '../../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent } from '@testing-library/preact'
import { createAppSingleton } from '../../../factory'
import { factory } from './utils'

describe('month view header', () => {
  describe('api', () => {
    beforeEach(() => {
      cleanup()
    })

    it('should call the display year view action', () => {
      const callBackToTest = mockFn()
      const $app = createAppSingleton()
      const { container } = factory($app, callBackToTest)

      const monthYearElement = container.querySelector(
        '.sx__date-picker__month-view-header__month-year'
      )
      if (!monthYearElement) throw new Error('monthYearElement not found')
      fireEvent.click(monthYearElement)

      expect(callBackToTest).toHaveBeenCalled()
    })
  })
})

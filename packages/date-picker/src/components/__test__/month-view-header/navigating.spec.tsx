import {
  describe,
  expect,
  it,
  mockFn,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { fireEvent, render, waitFor } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewHeader from '../../month-view-header'
import { createAppSingleton } from '../../../factory'
import { factory } from './utils'

describe('month view header', () => {
  describe('navigating through the months', () => {
    it('should go to next month', async () => {
      const selectedDate = '2021-01-01'
      const expectedMonthName = 'February 2021'
      const $app = createAppSingleton({ selectedDate })

      const { container } = factory($app)

      const nextButton = container.querySelector('button:last-child')
      if (!nextButton) {
        throw new Error('nextButton is not defined')
      }
      fireEvent.click(nextButton)

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })

    it('should go to previous month', async () => {
      const selectedDate = '2021-01-01'
      const expectedMonthName = 'December 2020'
      const $app = createAppSingleton({ selectedDate })

      const { container } = factory($app)

      const previousButton = container.querySelector('button:first-child')
      if (!previousButton) {
        throw new Error('previousButton is not defined')
      }
      fireEvent.click(previousButton)

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })
  })
})

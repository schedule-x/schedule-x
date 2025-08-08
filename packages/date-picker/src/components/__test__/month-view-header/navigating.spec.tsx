import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { fireEvent, waitFor } from '@testing-library/preact'
import { createAppSingleton } from '../../../factory'
import { renderComponent } from './utils'

describe('month view header', () => {
  describe('navigating through the months', () => {
    it('should go to next month', async () => {
      const selectedDate = Temporal.PlainDate.from('2021-01-01')
      const expectedMonthName = 'February 2021'
      const $app = createAppSingleton({ selectedDate })

      const { container } = renderComponent($app)

      const nextButton = container.querySelector('button:last-child')
      if (!nextButton) {
        throw new Error('nextButton is not defined')
      }
      fireEvent.mouseUp(nextButton)

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })

    it('should go to previous month', async () => {
      const selectedDate = Temporal.PlainDate.from('2021-01-01')
      const expectedMonthName = 'December 2020'
      const $app = createAppSingleton({ selectedDate })

      const { container } = renderComponent($app)

      const previousButton = container.querySelector('button:first-child')
      if (!previousButton) {
        throw new Error('previousButton is not defined')
      }
      fireEvent.mouseUp(previousButton)

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })
  })
})

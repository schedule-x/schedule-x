import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, waitFor } from '@testing-library/preact'
import { createAppSingleton } from '../../../factory'
import { renderComponent } from './utils'

describe('month view header', () => {
  describe('displaying month and year', () => {
    afterEach(() => {
      cleanup()
    })

    it.each([
      ['English', 'en-US', 'January'],
      ['French', 'fr-FR', 'janvier'],
      ['Spanish', 'es-ES', 'enero'],
    ])(
      'should display the month name in %s when rendering',
      (languageName, locale, januaryName) => {
        const selectedDate = '2021-01-01'
        const expectedMonthName = januaryName
        const $app = createAppSingleton({
          selectedDate,
          locale,
        })

        const { container } = renderComponent($app)

        expect(container.textContent).toContain(expectedMonthName)
      }
    )

    it('should display the year when rendering', () => {
      const selectedDate = '2021-01-01'
      const expectedYear = '2021'
      const $app = createAppSingleton({ selectedDate })

      const { container } = renderComponent($app)

      expect(container.textContent).toContain(expectedYear)
    })

    it('should update month name when selected date changes', async () => {
      const selectedDate = '2021-01-01'
      const expectedMonthName = 'February'
      const $app = createAppSingleton({ selectedDate })

      const { container } = renderComponent($app)

      $app.datePickerState.datePickerDate.value = '2021-02-01'

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })
  })
})

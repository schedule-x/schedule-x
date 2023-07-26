import {
  describe,
  it,
  expect,
  afterEach,
  mockFn,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, waitFor } from '@testing-library/preact'
import MonthViewHeader from '../../month-view-header'
import { AppContext } from '../../../utils/stateful/app-context'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

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
        const $app = __createDatePickerAppSingleton__(selectedDate, locale)

        const { container } = render(
          <AppContext.Provider value={$app}>
            <MonthViewHeader setYearsView={mockFn} />
          </AppContext.Provider>
        )

        expect(container.textContent).toContain(expectedMonthName)
      }
    )

    it('should display the year when rendering', () => {
      const selectedDate = '2021-01-01'
      const expectedYear = '2021'
      const $app = __createDatePickerAppSingleton__(selectedDate)

      const { container } = render(
        <AppContext.Provider value={$app}>
          <MonthViewHeader setYearsView={mockFn} />
        </AppContext.Provider>
      )

      expect(container.textContent).toContain(expectedYear)
    })

    it('should update month name when selected date changes', async () => {
      const selectedDate = '2021-01-01'
      const expectedMonthName = 'February'
      const $app = __createDatePickerAppSingleton__(selectedDate, 'en-US')

      const { container } = render(
        <AppContext.Provider value={$app}>
          <MonthViewHeader setYearsView={mockFn} />
        </AppContext.Provider>
      )

      $app.datePickerState.datePickerDate.value = '2021-02-01'

      await waitFor(() => {
        expect(container.textContent).toContain(expectedMonthName)
      })
    })
  })
})

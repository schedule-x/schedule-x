import {
  beforeEach,
  describe,
  expect,
  it,
  mockFn,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import YearsView from '../years-view'
import { AppContext } from '../../utils/stateful/app-context'
import { __createDatePickerAppSingleton__ } from '../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'

describe('YearsView', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should call setMonthView', () => {
    const callbackToTest = mockFn()
    render(
      <AppContext.Provider value={__createDatePickerAppSingleton__()}>
        <YearsView setMonthView={callbackToTest} />
      </AppContext.Provider>
    )

    screen.getByText('Januar').click()

    expect(callbackToTest).toHaveBeenCalled()
  })

  it.each([
    ['2015'],
    ['2019'],
    ['2020'],
    ['2021'],
    ['2022'],
    ['2024'],
    ['2025'],
  ])('should expand year %s', async (year) => {
    render(
      <AppContext.Provider value={__createDatePickerAppSingleton__()}>
        <YearsView setMonthView={mockFn} />
      </AppContext.Provider>
    )

    screen.getByText(year).click()

    await waitFor(() => {
      const currentExpandedYear = screen.getByText('Januar').closest('li')
      if (!currentExpandedYear) throw new Error('currentExpandedYear is null')
      expect(currentExpandedYear.textContent).toContain(year)
      expect(
        currentExpandedYear.querySelectorAll(
          '.sx__date-picker__years-view-accordion__month'
        )
      ).toHaveLength(12)
    })
  })
})

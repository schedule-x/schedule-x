import {
  beforeEach,
  describe,
  expect,
  it,
  mockFn,
} from '../../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import YearsView from '../years-view'
import { AppContext } from '../../utils/stateful/app-context'
import { createAppSingleton } from '../../factory'
import { appSingletonWithGerman } from '../../utils/stateless/testing/create-app-singleton'

describe('YearsView', () => {
  beforeEach(() => {
    cleanup()
    window.HTMLElement.prototype.scrollIntoView = mockFn()
  })

  it('should call setMonthView', () => {
    const callbackToTest = mockFn()
    render(
      <AppContext.Provider value={appSingletonWithGerman()}>
        <YearsView setMonthView={callbackToTest} />
      </AppContext.Provider>
    )

    screen.getByText('Januar').click()

    expect(callbackToTest).toHaveBeenCalled()
  })

  it.each([['2015'], ['2019'], ['2020'], ['2021'], ['2022'], ['2024']])(
    'should expand year %s',
    async (year) => {
      render(
        <AppContext.Provider value={appSingletonWithGerman()}>
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
    }
  )

  it('should display default years', () => {
    const $app = createAppSingleton()

    render(
      <AppContext.Provider value={$app}>
        <YearsView setMonthView={mockFn} />
      </AppContext.Provider>
    )

    const currentYear = new Date().getFullYear()

    expect(screen.queryByText('1969')).toBeNull()
    expect(screen.queryByText('1970')).not.toBeNull()
    expect(screen.queryByText(currentYear + 1)).not.toBeNull()
    expect(screen.queryByText(currentYear + 2)).toBeNull()
  })

  it('should display years based on min- & max dates in config', () => {
    const $app = createAppSingleton({
      min: '2020-01-01',
      max: '2021-01-01',
    })

    render(
      <AppContext.Provider value={$app}>
        <YearsView setMonthView={mockFn} />
      </AppContext.Provider>
    )

    expect(screen.queryByText('2019')).toBeNull()
    expect(screen.queryByText('2020')).not.toBeNull()
    expect(screen.queryByText('2021')).not.toBeNull()
    expect(screen.queryByText('2022')).toBeNull()
  })
})

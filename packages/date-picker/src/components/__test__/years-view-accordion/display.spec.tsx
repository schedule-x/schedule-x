import {
  describe,
  it,
  expect,
  mockFn,
  beforeEach,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import YearsViewAccordion from '../../years-view-accordion'
import { createAppSingleton } from '../../../factory'

describe('YearsViewAccordion', () => {
  describe('display', () => {
    beforeEach(() => {
      cleanup()
    })

    it('should not display any months when not expanded', () => {
      const $app = createAppSingleton()
      render(
        <AppContext.Provider value={$app}>
          <YearsViewAccordion
            year={2023}
            setYearAndMonth={mockFn}
            isExpanded={false}
            expand={mockFn}
          />
        </AppContext.Provider>
      )

      expect(
        screen.queryAllByText(
          /January|February|March|April|May|June|July|August|September|October|November|December/
        )
      ).toEqual([])
    })

    it('should display all months when expanded', () => {
      const $app = createAppSingleton()
      render(
        <AppContext.Provider value={$app}>
          <YearsViewAccordion
            year={2023}
            setYearAndMonth={mockFn}
            isExpanded={true}
            expand={mockFn}
          />
        </AppContext.Provider>
      )

      expect(
        screen.queryAllByText(
          /January|February|March|April|May|June|July|August|September|October|November|December/
        )
      ).toHaveLength(12)
    })

    it('should display the year in a button', () => {
      const $app = createAppSingleton()
      const expectedYear = 2023
      render(
        <AppContext.Provider value={$app}>
          <YearsViewAccordion
            year={expectedYear}
            setYearAndMonth={mockFn}
            isExpanded={true}
            expand={mockFn}
          />
        </AppContext.Provider>
      )

      expect(screen.queryByText(expectedYear)).not.toBeNull()
    })
  })
})

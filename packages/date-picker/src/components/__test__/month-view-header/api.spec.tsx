import {
  describe,
  it,
  expect,
  beforeEach,
  mockFn,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, render } from '@testing-library/preact'
import MonthViewHeader from '../../month-view-header'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { AppContext } from '../../../utils/stateful/app-context'

describe('month view header', () => {
  describe('api', () => {
    beforeEach(() => {
      cleanup()
    })

    it('should call the display year view action', () => {
      const callBackToTest = mockFn()
      const $app = __createDatePickerAppSingleton__()
      const { container } = render(
        <AppContext.Provider value={$app}>
          <MonthViewHeader setYearsView={callBackToTest} />
        </AppContext.Provider>
      )

      const monthYearElement = container.querySelector(
        '.sx__date-picker__month-view-header__month-year'
      )
      if (!monthYearElement) throw new Error('monthYearElement not found')
      fireEvent.click(monthYearElement)

      expect(callBackToTest).toHaveBeenCalled()
    })
  })
})

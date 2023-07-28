import {
  describe,
  it,
  expect,
  beforeEach,
  mockFn,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { AppContext } from '../../../utils/stateful/app-context'
import YearsViewAccordion from '../../years-view-accordion'
import { Month } from '../../../../../../shared/enums/time/month.enum'

describe('YearsViewAccordion', () => {
  describe('api', () => {
    beforeEach(() => {
      cleanup()
    })

    it('should call expand with the correct year', () => {
      const expandSpy = mockFn()
      const $app = __createDatePickerAppSingleton__(undefined, 'en-US')
      const year = 2023
      render(
        <AppContext.Provider value={$app}>
          <YearsViewAccordion
            year={year}
            setYearAndMonth={mockFn}
            isExpanded={false}
            expand={expandSpy}
          />
        </AppContext.Provider>
      )

      screen.getByText(year).click()

      expect(expandSpy).toHaveBeenCalledWith(year)
    })

    it.each([
      ['January', Month.JANUARY],
      ['February', Month.FEBRUARY],
      ['March', Month.MARCH],
      ['April', Month.APRIL],
      ['May', Month.MAY],
      ['June', Month.JUNE],
      ['July', Month.JULY],
      ['August', Month.AUGUST],
      ['September', Month.SEPTEMBER],
      ['October', Month.OCTOBER],
      ['November', Month.NOVEMBER],
      ['December', Month.DECEMBER],
    ])(
      'should call setYearAndMonth with year 2023 and month of %s',
      (monthName, month) => {
        const setYearAndMonthSpy = mockFn()
        const $app = __createDatePickerAppSingleton__(undefined, 'en-US')
        const year = 2023
        render(
          <AppContext.Provider value={$app}>
            <YearsViewAccordion
              year={year}
              setYearAndMonth={setYearAndMonthSpy}
              isExpanded={true}
              expand={mockFn}
            />
          </AppContext.Provider>
        )

        screen.getByText(monthName).click()

        expect(setYearAndMonthSpy).toHaveBeenCalledWith(year, month)
      }
    )
  })
})

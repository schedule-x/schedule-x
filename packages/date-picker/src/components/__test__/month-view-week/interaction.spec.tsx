import {
  describe,
  it,
  expect,
  spyOn,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { __createDatePickerAppSingleton__ } from '../../../../../../shared/utils/stateless/testing/unit/factories/create-date-picker-app-singleton'
import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewWeek from '../../month-view-week'
import { Month } from '../../../../../../shared/enums/time/month.enum'
import TimeUnitsBuilder from '../../../../../../shared/utils/stateful/time-units/time-units.builder'

describe('MonthViewWeek', () => {
  it('should close date picker', () => {
    const $app = __createDatePickerAppSingleton__()
    $app.datePickerState.isOpen.value = true
    const closeSpy = spyOn($app.datePickerState, 'close')
    render(
      <AppContext.Provider value={$app}>
        <MonthViewWeek
          week={new TimeUnitsBuilder()
            .build()
            .getWeekFor(new Date(2023, Month.JULY, 23))}
        />
      </AppContext.Provider>
    )
    expect($app.datePickerState.isOpen.value).toBe(true)

    screen.getByText('17').click()

    expect(closeSpy).toHaveBeenCalled()
    expect($app.datePickerState.isOpen.value).toBe(false)
  })
})

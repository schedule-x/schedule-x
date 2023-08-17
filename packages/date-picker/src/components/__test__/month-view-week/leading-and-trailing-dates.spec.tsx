import {
  describe,
  expect,
  it,
} from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { Month } from '../../../../../../shared/enums/time/month.enum'
import { factory } from './utils'
import { toDateString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { createAppSingleton } from '../../../factory'

const SELECTOR = '.sx__date-picker__day.is-leading-or-trailing'

const setup = (date: Date) => {
  const $app = createAppSingleton({ selectedDate: toDateString(date) })
  const { container } = factory($app, $app.timeUnitsImpl.getWeekFor(date))
  return container
}

describe('MonthViewWeek', () => {
  it('should contain 5 leading dates for July 2023', () => {
    const container = setup(new Date(2023, Month.JULY, 1))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(5)
  })

  it('should not contain any trailing or leading dates for July 2023', () => {
    const container = setup(new Date(2023, Month.JULY, 16))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(0)
  })

  it('should contain 6 trailing dates for July 2023', () => {
    const container = setup(new Date(2023, Month.JULY, 31))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(6)
  })
})

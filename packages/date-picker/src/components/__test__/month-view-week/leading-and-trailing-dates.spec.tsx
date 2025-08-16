import 'temporal-polyfill/global'
import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { renderComponent } from './utils'
import { createAppSingleton } from '../../../factory'

const SELECTOR = '.sx__date-picker__day.is-leading-or-trailing'

const setup = (date: Temporal.PlainDate) => {
  const $app = createAppSingleton({ selectedDate: date })
  const { container } = renderComponent(
    $app,
    $app.timeUnitsImpl.getWeekFor(date)
  )
  return container
}

describe('MonthViewWeek', () => {
  it('should contain 5 leading dates for July 2023', () => {
    const container = setup(Temporal.PlainDate.from('2023-07-01'))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(5)
  })

  it('should not contain any trailing or leading dates for July 2023', () => {
    const container = setup(Temporal.PlainDate.from('2023-07-16'))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(0)
  })

  it('should contain 6 trailing dates for July 2023', () => {
    const container = setup(Temporal.PlainDate.from('2023-07-31'))
    const leadingOrTrailingDates = container.querySelectorAll(SELECTOR)
    expect(leadingOrTrailingDates.length).toBe(6)
  })
})

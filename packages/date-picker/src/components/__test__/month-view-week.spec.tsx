import {
  describe,
  it,
  expect,
} from '../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { render } from '@testing-library/preact'
import MonthViewWeek from '../month-view-week'
import TimeUnitsBuilder from '../../../../../shared/utils/stateful/time-units/time-units.builder'
import { Month } from '../../../../../shared/enums/time/month.enum'

describe('MonthViewWeek', () => {
  const timeUnitsImpl = new TimeUnitsBuilder().build()

  it('should render week', () => {
    const date = new Date(2023, Month.JULY, 23)
    const week = timeUnitsImpl.getWeekFor(date)
    const { container } = render(<MonthViewWeek week={week} />)

    expect(container.textContent).toContain('17')
    expect(container.textContent).toContain('18')
    expect(container.textContent).toContain('19')
    expect(container.textContent).toContain('20')
    expect(container.textContent).toContain('21')
    expect(container.textContent).toContain('22')
    expect(container.textContent).toContain('23')
  })
})

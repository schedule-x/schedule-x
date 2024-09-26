import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'
import { viewMonthGrid } from '../views/month-grid'

describe('The calendar factory', () => {
  it('should create a calendar app', () => {
    const underTest = createCalendar

    const result = underTest({
      views: [viewMonthGrid],
    })

    expect(result).toBeInstanceOf(CalendarApp)
  })

  it('should throw an error if initializing with double plugin lists', () => {
    const underTest = createCalendar

    expect(() => {
      underTest(
        {
          views: [viewMonthGrid],
          plugins: [],
        },
        []
      )
    }).toThrow()
  })
})

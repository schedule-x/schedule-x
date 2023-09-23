import {
  describe,
  it,
  expect,
} from '../../../shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'

describe('The calendar factory', () => {
  it('should create a calendar app', () => {
    const underTest = createCalendar

    const result = underTest(document.createElement('div'))

    expect(result).toBeInstanceOf(CalendarApp)
  })
})

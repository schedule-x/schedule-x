import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createCalendar } from '../factory'
import CalendarApp from '../calendar.app'
import { viewMonth } from '../views/month'

describe('The calendar factory', () => {
  it('should create a calendar app', () => {
    const underTest = createCalendar

    const result = underTest(document.createElement('div'), {
      views: [viewMonth],
    })

    expect(result).toBeInstanceOf(CalendarApp)
  })
})

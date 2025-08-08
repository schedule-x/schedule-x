import { WeekWithDates } from '../../../../../types/time'
import { expect } from '../../../../stateless/testing/unit/unit-testing-library.impl'

export const expectWeekDatesToBe = (
  week: WeekWithDates,
  expectedDates: number[]
) => {
  const weekDates = week.map((date) => date.day)
  expect(weekDates).toEqual(expectedDates)
}

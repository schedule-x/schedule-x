import { WeekWithDates } from '../../../../../types/time.ts'
import { expect } from '../../../../stateless/testing/unit/unit-testing-library.impl.ts'

export const expectWeekDatesToBe = (
  week: WeekWithDates,
  expectedDates: number[]
) => {
  const weekDates = week.map((date) => date.getDate())
  expect(weekDates).toEqual(expectedDates)
}

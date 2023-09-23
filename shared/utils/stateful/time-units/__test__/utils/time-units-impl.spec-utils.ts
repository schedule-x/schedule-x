import { WeekWithDates } from '../../../../../types/time'
import { expect } from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl.ts'

export const expectWeekDatesToBe = (
  week: WeekWithDates,
  expectedDates: number[]
) => {
  const weekDates = week.map((date) => date.getDate())
  expect(weekDates).toEqual(expectedDates)
}

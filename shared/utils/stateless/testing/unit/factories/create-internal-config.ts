import { WeekDay } from '../../../../../enums/time/week-day.enum.ts'
import { DEFAULT_LOCALE } from '../../../../../values'
import { Placement } from '@schedule-x/date-picker/src/enums/placement.enum.ts'

export const __createInternalConfig__ = (locale?: string) => {
  return {
    locale: locale || DEFAULT_LOCALE,
    min: '1970-01-01',
    max: '2024-12-31',
    placement: Placement.BOTTOM_START,
    firstDayOfWeek: WeekDay.MONDAY,
    listeners: {},
  }
}

import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { DEFAULT_LOCALE } from '@schedule-x/shared/src/values'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'

export const __createInternalConfig__ = (locale?: string) => {
  return {
    locale: locale || DEFAULT_LOCALE,
    min: '1970-01-01',
    max: '2024-12-31',
    placement: Placement.BOTTOM_START,
    firstDayOfWeek: WeekDay.MONDAY,
    listeners: {},
    style: {},
  }
}

import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { signal } from '@preact/signals'

export const __createInternalConfig__ = (
  locale?: string,
  firstDayOfWeek?: WeekDay
) => {
  return {
    locale: signal(locale || DEFAULT_LOCALE),
    min: '1970-01-01',
    max: '2100-12-31',
    placement: Placement.BOTTOM_START,
    firstDayOfWeek: signal(firstDayOfWeek ?? DEFAULT_FIRST_DAY_OF_WEEK),
    listeners: {},
    style: {},
  }
}

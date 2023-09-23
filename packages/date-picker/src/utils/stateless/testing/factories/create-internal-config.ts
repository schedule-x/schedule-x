import { WeekDay } from '../../../../../../../shared/enums/time/week-day.enum'
import { DEFAULT_LOCALE } from '../../../../../../../shared/values'
import { Placement } from '../../../../enums/placement.enum'

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

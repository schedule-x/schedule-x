import { datePickerSrLatnRS } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSrLatnRS } from './calendar'
import { timePickerSrLatnRS } from './time-picker'

export const srLatnRS: Language = {
  ...datePickerSrLatnRS,
  ...calendarSrLatnRS,
  ...timePickerSrLatnRS,
}

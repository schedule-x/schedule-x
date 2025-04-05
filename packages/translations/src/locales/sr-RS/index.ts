import { datePickerSrRS } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSrRS } from './calendar'
import { timePickerSrRS } from './time-picker'

export const srRS: Language = {
  ...datePickerSrRS,
  ...calendarSrRS,
  ...timePickerSrRS,
}

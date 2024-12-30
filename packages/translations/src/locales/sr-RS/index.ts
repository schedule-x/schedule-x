import { datePickerSrRS } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSrRS } from './calendar'

export const srRS: Language = {
  ...datePickerSrRS,
  ...calendarSrRS,
}

import { datePickerEnGB } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarEnGB } from './calendar'

export const enGB: Language = {
  ...datePickerEnGB,
  ...calendarEnGB,
}

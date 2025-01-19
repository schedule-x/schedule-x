import { datePickerSlSI } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSlSI } from './calendar'

export const slSI: Language = {
  ...datePickerSlSI,
  ...calendarSlSI,
}

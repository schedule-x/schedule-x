import { datePickerNbNO } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarNbNO } from './calendar'
import { timePickerNbNO } from './time-picker'

export const nbNO: Language = {
  ...datePickerNbNO,
  ...calendarNbNO,
  ...timePickerNbNO,
}


import { datePickerJaJP } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarJaJP } from './calendar'
import { timePickerJaJP } from './time-picker'

export const jaJP: Language = {
  ...datePickerJaJP,
  ...calendarJaJP,
  ...timePickerJaJP,
}

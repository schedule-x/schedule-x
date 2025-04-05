import { datePickerTrTR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarTrTR } from './calendar'
import { timePickerTrTR } from './time-picker'

export const trTR: Language = {
  ...datePickerTrTR,
  ...calendarTrTR,
  ...timePickerTrTR,
}

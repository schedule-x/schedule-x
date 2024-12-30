import { datePickerTrTR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarTrTR } from './calendar'

export const trTR: Language = {
  ...datePickerTrTR,
  ...calendarTrTR,
}

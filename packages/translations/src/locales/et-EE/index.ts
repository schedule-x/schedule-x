import { datePickerEtEE } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarEtEE } from './calendar'

export const etEE: Language = {
  ...datePickerEtEE,
  ...calendarEtEE,
}

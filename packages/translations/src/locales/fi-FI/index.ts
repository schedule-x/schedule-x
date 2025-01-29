import { datePickerFiFI } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarFiFI } from './calendar'

export const fiFI: Language = {
  ...datePickerFiFI,
  ...calendarFiFI,
}

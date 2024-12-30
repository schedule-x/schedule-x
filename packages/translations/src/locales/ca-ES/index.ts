import { datePickerCaES } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarCaES } from './calendar'

export const caES: Language = {
  ...datePickerCaES,
  ...calendarCaES,
}

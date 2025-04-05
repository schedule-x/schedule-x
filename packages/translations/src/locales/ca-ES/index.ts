import { datePickerCaES } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarCaES } from './calendar'
import { timePickerCaES } from './time-picker'

export const caES: Language = {
  ...datePickerCaES,
  ...calendarCaES,
  ...timePickerCaES,
}

import { datePickerLtLT } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarLtLT } from './calendar'
import { timePickerLtLT } from './time-picker'

export const ltLT: Language = {
  ...datePickerLtLT,
  ...calendarLtLT,
  ...timePickerLtLT,
}

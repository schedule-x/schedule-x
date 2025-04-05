import { datePickerMkMK } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarMkMK } from './calendar'
import { timePickerMkMK } from './time-picker'

export const mkMK: Language = {
  ...datePickerMkMK,
  ...calendarMkMK,
  ...timePickerMkMK,
}

import { datePickerDaDK } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarDaDK } from './calendar'
import { timePickerDaDK } from './time-picker'

export const daDK: Language = {
  ...datePickerDaDK,
  ...calendarDaDK,
  ...timePickerDaDK,
}

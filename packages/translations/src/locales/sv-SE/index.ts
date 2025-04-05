import { datePickerSvSE } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSvSE } from './calendar'
import { timePickerSvSE } from './time-picker'

export const svSE: Language = {
  ...datePickerSvSE,
  ...calendarSvSE,
  ...timePickerSvSE,
}

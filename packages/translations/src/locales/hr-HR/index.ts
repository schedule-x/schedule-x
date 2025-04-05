import { datePickerHrHR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarHrHR } from './calendar'
import { timePickerHrHR } from './time-picker'

export const hrHR: Language = {
  ...datePickerHrHR,
  ...calendarHrHR,
  ...timePickerHrHR,
}

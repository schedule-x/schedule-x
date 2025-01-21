import { datePickerHrHR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarHrHR } from './calendar'

export const hrHR: Language = {
  ...datePickerHrHR,
  ...calendarHrHR,
}

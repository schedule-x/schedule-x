import { Language } from '../../types/language.translations'
import { calendarNlNL } from './calendar'
import { datePickerNlNL } from './date-picker'

export const nlNL: Language = {
  ...datePickerNlNL,
  ...calendarNlNL,
}

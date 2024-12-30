import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarNlNL } from './calendar'
import { datePickerNlNL } from './date-picker'

export const nlNL: Language = {
  ...datePickerNlNL,
  ...calendarNlNL,
}

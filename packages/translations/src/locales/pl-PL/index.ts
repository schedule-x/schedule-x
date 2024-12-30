import { datePickerPlPL } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarPlPL } from './calendar'

export const plPL: Language = {
  ...datePickerPlPL,
  ...calendarPlPL,
}

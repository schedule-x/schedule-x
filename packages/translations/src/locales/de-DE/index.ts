import { datePickerDeDE } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarDeDE } from './calendar'

export const deDE: Language = {
  ...datePickerDeDE,
  ...calendarDeDE,
}

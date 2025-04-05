import { datePickerDeDE } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarDeDE } from './calendar'
import { timePickerDeDE } from './time-picker'

export const deDE: Language = {
  ...datePickerDeDE,
  ...calendarDeDE,
  ...timePickerDeDE,
}

import { datePickerCsCZ } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarCsCZ } from './calendar'
import { timePickerCsCZ } from './time-picker'

export const csCZ: Language = {
  ...datePickerCsCZ,
  ...calendarCsCZ,
  ...timePickerCsCZ,
}

import { datePickerArEG } from './date-picker'
import { timePickerArEG } from './time-picker'
import { calendarArEG } from './calendar'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'

export const arEG: Language = {
  ...calendarArEG,
  ...datePickerArEG,
  ...timePickerArEG,
}

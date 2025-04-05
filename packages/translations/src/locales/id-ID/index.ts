import { datePickerIdID } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarIdID } from './calendar'
import { timePickerIdID } from './time-picker'

export const idID: Language = {
  ...datePickerIdID,
  ...calendarIdID,
  ...timePickerIdID,
}

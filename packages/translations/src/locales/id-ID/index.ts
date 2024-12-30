import { datePickerIdID } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarIdID } from './calendar'

export const idID: Language = {
  ...datePickerIdID,
  ...calendarIdID,
}

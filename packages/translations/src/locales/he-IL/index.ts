import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { datePickerHeIL } from './date-picker'
import { calendarHeIL } from './calendar'
import { timePickerHeIL } from './time-picker'

export const heIL: Language = {
  ...datePickerHeIL,
  ...calendarHeIL,
  ...timePickerHeIL,
}

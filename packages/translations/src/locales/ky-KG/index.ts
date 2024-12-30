import { datePickerKyKG } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarKyKG } from './calendar'

export const kyKG: Language = {
  ...datePickerKyKG,
  ...calendarKyKG,
}

import { datePickerKyKG } from './date-picker'
import { Language } from '../../types/language.translations'
import { calendarKyKG } from './calendar'

export const kyKG: Language = {
  ...datePickerKyKG,
  ...calendarKyKG,
}

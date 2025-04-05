import { datePickerKoKR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarKoKR } from './calender'
import { timePickerKoKR } from './time-picker'

export const koKR: Language = {
  ...datePickerKoKR,
  ...calendarKoKR,
  ...timePickerKoKR,
}

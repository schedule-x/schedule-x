import { datePickerKoKR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarKoKR } from './calender'

export const koKR: Language = {
  ...datePickerKoKR,
  ...calendarKoKR,
}

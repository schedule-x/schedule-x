import { datePickerKgKG } from './date-picker'
import { Language } from '../../types/language.translations'
import { calendarKgKG } from './calendar'
import { monthsWeekdaysKgKG } from './months-weekdays'

export const kgKG: Language = {
  ...datePickerKgKG,
  ...calendarKgKG,
  ...monthsWeekdaysKgKG,
}

import { datePickerEnUS } from './date-picker'
import { Language } from '../../types/language.translations'
import { calendarEnUS } from './calendar'

export const enUS: Language = {
  ...datePickerEnUS,
  ...calendarEnUS,
}

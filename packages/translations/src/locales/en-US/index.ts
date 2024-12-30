import { datePickerEnUS } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarEnUS } from './calendar'

export const enUS: Language = {
  ...datePickerEnUS,
  ...calendarEnUS,
}

import { datePickerRoRO } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarRoRO } from './calendar'

export const roRO: Language = {
  ...datePickerRoRO,
  ...calendarRoRO,
}

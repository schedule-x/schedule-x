import { datePickerRoRO } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarRoRO } from './calendar'
import { timePickerRoRO } from './time-picker'

export const roRO: Language = {
  ...datePickerRoRO,
  ...calendarRoRO,
  ...timePickerRoRO,
}

import { datePickerZhTW } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarZhTW } from './calendar'
import { timePickerZhTW } from './time-picker'

export const zhTW: Language = {
  ...datePickerZhTW,
  ...calendarZhTW,
  ...timePickerZhTW,
}

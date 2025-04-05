import { datePickerZhCN } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarZhCN } from './calendar'
import { timePickerZhCN } from './time-picker'

export const zhCN: Language = {
  ...datePickerZhCN,
  ...calendarZhCN,
  ...timePickerZhCN,
}

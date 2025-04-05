import { datePickerSkSK } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSkSK } from './calendar'
import { timePickerSkSK } from './time-picker'

export const skSK: Language = {
  ...datePickerSkSK,
  ...calendarSkSK,
  ...timePickerSkSK,
}

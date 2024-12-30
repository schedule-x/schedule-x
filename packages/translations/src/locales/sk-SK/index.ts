import { datePickerSkSK } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSkSK } from './calendar'

export const skSK: Language = {
  ...datePickerSkSK,
  ...calendarSkSK,
}

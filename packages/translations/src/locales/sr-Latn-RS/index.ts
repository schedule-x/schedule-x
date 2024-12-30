import { datePickerSrLatnRS } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarSrLatnRS } from './calendar'

export const srLatnRS: Language = {
  ...datePickerSrLatnRS,
  ...calendarSrLatnRS,
}

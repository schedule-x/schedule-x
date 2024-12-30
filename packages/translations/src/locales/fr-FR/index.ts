import { datePickerFrFR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarFrFR } from './calendar'

export const frFR: Language = {
  ...datePickerFrFR,
  ...calendarFrFR,
}

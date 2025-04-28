import { datePickerFrCH } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarFrFR } from '../fr-FR/calendar'
import { timePickerFrFR } from '../fr-FR/time-picker'

export const frCH: Language = {
  ...datePickerFrCH,
  ...calendarFrFR,
  ...timePickerFrFR,
}

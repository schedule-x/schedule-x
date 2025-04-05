import { datePickerPtBR } from './date-picker'
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { calendarPtBR } from './calendar'
import { timePickerPtBR } from './time-picker'

export const ptBR: Language = {
  ...datePickerPtBR,
  ...calendarPtBR,
  ...timePickerPtBR,
}

import { DatePickerTranslations } from './date-picker.translations'
import { CalendarTranslations } from './calendar.translations'
import { TimePickerTranslations } from './time-picker.translations'

export type Language = Partial<DatePickerTranslations> &
  Partial<CalendarTranslations> &
  Partial<TimePickerTranslations> &
  Record<string, string> // enable custom & premium plugins to use the default translator

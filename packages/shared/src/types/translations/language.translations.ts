import { DatePickerTranslations } from './date-picker.translations'
import { CalendarTranslations } from './calendar.translations'

export type Language = DatePickerTranslations &
  CalendarTranslations &
  Record<string, string> // enable custom & premium plugins to use the default translator

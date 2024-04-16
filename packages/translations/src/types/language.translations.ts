import { DatePickerTranslations } from './date-picker.translations'
import { CalendarTranslations } from './calendar.translations'
import { MonthsWeekdaysTranslations } from './months-weeks.translations'

export type Language = DatePickerTranslations &
  CalendarTranslations &
  Partial<MonthsWeekdaysTranslations>

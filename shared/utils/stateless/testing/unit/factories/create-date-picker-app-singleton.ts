import TimeUnitsBuilder from '../../../../stateful/time-units/time-units.builder.ts'
import DatePickerAppSingleton from '@schedule-x/date-picker/src/utils/stateful/app-singleton/date-picker-app.singleton.ts'
import { createDatePickerState } from '../../../../stateful/date-picker-state/date-picker-state.impl.ts'
import { ConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder.ts'

export const __createDatePickerAppSingleton__: (
  selectedDate?: string,
  locale?: string
) => DatePickerAppSingleton = (selectedDate?: string, locale = 'de-DE') => {
  return {
    datePickerState: createDatePickerState(selectedDate),
    timeUnitsImpl: new TimeUnitsBuilder().build(),
    config: new ConfigBuilder().withLocale(locale).build(),
  }
}

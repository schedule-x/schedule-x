import TimeUnitsBuilder from '../../../../stateful/time-units/time-units.builder'
import DatePickerAppSingleton from '@schedule-x/date-picker/src/utils/stateful/app-singleton/date-picker-app.singleton'
import { createDatePickerState } from '../../../../stateful/date-picker-state/date-picker-state.impl'
import { ConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'

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

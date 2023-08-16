import TimeUnitsBuilder from '../../../../stateful/time-units/time-units.builder'
import DatePickerAppSingleton from '@schedule-x/date-picker/src/utils/stateful/app-singleton/date-picker-app.singleton'
import { createDatePickerState } from '../../../../stateful/date-picker-state/date-picker-state.impl'
import { ConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { toDateString } from '../../../time/format-conversion/date-to-strings.ts'
import { Placement } from '@schedule-x/date-picker/src/enums/placement.enum.ts'
import { translate, translations } from '@schedule-x/translations/src'

export const __createDatePickerAppSingleton__: (
  selectedDate?: string,
  locale?: string,
  min?: string,
  max?: string,
  placement?: Placement
) => DatePickerAppSingleton = (
  selectedDate?: string,
  locale = 'de-DE',
  min = '1970-01-01',
  max = toDateString(new Date(new Date().getFullYear() + 1, 11, 31)),
  placement = Placement.BOTTOM_START
) => {
  return {
    datePickerState: createDatePickerState({
      locale,
      min,
      max,
      placement,
      firstDayOfWeek: 1,
    }, selectedDate),
    timeUnitsImpl: new TimeUnitsBuilder().build(),
    config: new ConfigBuilder()
      .withLocale(locale)
      .withMin(min)
      .withMax(max)
      .withPlacement(placement)
      .build(),
    translate: translate(locale, translations),
  }
}

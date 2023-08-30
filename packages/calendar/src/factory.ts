import CalendarApp from './calendar.app'
import CalendarConfigInternal, {
  CalendarConfigExternal,
} from './utils/stateful/config/calendar-config'
import CalendarConfigBuilder from './utils/stateful/config/calendar-config.builder'
import CalendarAppSingletonBuilder from './utils/stateful/app-singleton/calendar-app-singleton.builder'
import TimeUnitsBuilder from '../../../shared/utils/stateful/time-units/time-units.builder'
import { createDatePickerState } from '../../../shared/utils/stateful/date-picker-state/date-picker-state.impl'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/date-picker/src/enums/placement.enum'
import { translate, translations } from '@schedule-x/translations/src'

const createCalendarAppSingleton = (config: CalendarConfigExternal) => {
  const internalConfig = new CalendarConfigBuilder()
    .withDatePickerConfig(config.datePickerConfig)
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .build()

  const timeUnitsImpl = new TimeUnitsBuilder()
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .build()

  const datePickerConfig = new DatePickerConfigBuilder()
    .withLocale(internalConfig.locale)
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .withMin(internalConfig.datePickerConfig.min)
    .withMax(internalConfig.datePickerConfig.max)
    .withPlacement(internalConfig.datePickerConfig.placement as Placement)
    .withListeners(internalConfig.datePickerConfig.listeners)
    .withStyle(internalConfig.datePickerConfig.style)
    .build()

  const datePickerState = createDatePickerState(
    datePickerConfig,
    config.datePickerConfig?.selectedDate
  )

  return new CalendarAppSingletonBuilder()
    .withConfig(internalConfig)
    .withTimeUnitsImpl(timeUnitsImpl)
    .withDatePickerState(datePickerState)
    .withTranslate(translate(internalConfig.locale, translations))
    .build()
}

export const createCalendar = (
  el: HTMLElement,
  config: CalendarConfigExternal
) => {
  const $app = createCalendarAppSingleton(config)

  return new CalendarApp(el, $app)
}

import CalendarApp from './calendar.app'
import { CalendarConfigExternal } from './utils/stateful/config/calendar-config'
import CalendarConfigBuilder from './utils/stateful/config/calendar-config.builder'
import CalendarAppSingletonBuilder from './utils/stateful/app-singleton/calendar-app-singleton.builder'
import TimeUnitsBuilder from '../../../shared/utils/stateful/time-units/time-units.builder'
import { createDatePickerState } from '../../../shared/utils/stateful/date-picker-state/date-picker-state.impl'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/date-picker/src/enums/placement.enum'
import { translate, translations } from '@schedule-x/translations/src'
import { createCalendarState } from './utils/stateful/calendar-state/calendar-state.impl'

const createCalendarAppSingleton = (config: CalendarConfigExternal) => {
  const internalConfig = new CalendarConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withDefaultView(config.defaultView)
    .build()

  const timeUnitsImpl = new TimeUnitsBuilder()
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .build()

  const calendarState = createCalendarState(internalConfig, timeUnitsImpl)

  const dateSelectionCallback = (date: string) => {
    calendarState.handleDateSelection(date)
  }

  const datePickerConfig = new DatePickerConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withMin(config.datePicker?.min)
    .withMax(config.datePicker?.max)
    .withStyle(config.datePicker?.style)
    .withPlacement(Placement.BOTTOM_END)
    .withListeners({ onChange: dateSelectionCallback })
    .build()

  return new CalendarAppSingletonBuilder()
    .withConfig(internalConfig)
    .withTimeUnitsImpl(timeUnitsImpl)
    .withDatePickerState(
      createDatePickerState(datePickerConfig, config.datePicker?.selectedDate)
    )
    .withDatePickerConfig(datePickerConfig)
    .withCalendarState(calendarState)
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

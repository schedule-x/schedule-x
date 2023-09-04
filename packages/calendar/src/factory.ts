import CalendarApp from './calendar.app'
import { CalendarConfigExternal } from './utils/stateful/config/calendar-config'
import CalendarAppSingletonBuilder from './utils/stateful/app-singleton/calendar-app-singleton.builder'
import { createDatePickerState } from '../../../shared/utils/stateful/date-picker-state/date-picker-state.impl'
import { ConfigBuilder as DatePickerConfigBuilder } from '@schedule-x/date-picker/src/utils/stateful/config/config.builder'
import { Placement } from '@schedule-x/date-picker/src/enums/placement.enum'
import { translate, translations } from '@schedule-x/translations/src'
import { createCalendarState } from './utils/stateful/calendar-state/calendar-state.impl'
import { createCalendarEventsImpl } from './utils/stateful/calendar-events/calendar-events.impl'
import { createInternalConfig } from './utils/stateless/factories/create-internal-config'
import { createTimeUnitsImpl } from './utils/stateless/factories/create-time-units-impl'
import { createDatePickerConfig } from './utils/stateless/factories/create-date-picker-config'

export const createCalendarAppSingleton = (
  config: CalendarConfigExternal = {}
) => {
  const internalConfig = createInternalConfig(config)
  const timeUnitsImpl = createTimeUnitsImpl(internalConfig)
  const calendarState = createCalendarState(internalConfig, timeUnitsImpl)
  const dateSelectionCallback = (date: string) => {
    calendarState.handleDateSelection(date)
  }
  const datePickerConfig = createDatePickerConfig(config, dateSelectionCallback)

  return new CalendarAppSingletonBuilder()
    .withConfig(internalConfig)
    .withTimeUnitsImpl(timeUnitsImpl)
    .withDatePickerState(
      createDatePickerState(datePickerConfig, config.datePicker?.selectedDate)
    )
    .withCalendarEvents(
      createCalendarEventsImpl(config.events || [], internalConfig)
    )
    .withDatePickerConfig(datePickerConfig)
    .withCalendarState(calendarState)
    .withTranslate(translate(internalConfig.locale, translations))
    .build()
}

export const createCalendar = (
  el: HTMLElement,
  config: CalendarConfigExternal = {}
) => {
  const $app = createCalendarAppSingleton(config)

  return new CalendarApp(el, $app)
}

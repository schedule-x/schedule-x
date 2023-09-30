import CalendarApp from './calendar.app'
import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarAppSingletonBuilder from './utils/stateful/app-singleton/calendar-app-singleton.builder'
import { createDatePickerState } from '@schedule-x/date-picker/src/utils/stateful/date-picker-state/date-picker-state.impl'
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
  const datePickerState = createDatePickerState(
    datePickerConfig,
    config.datePicker?.selectedDate
  )
  const calendarEvents = createCalendarEventsImpl(
    config.events || [],
    internalConfig
  )
  return new CalendarAppSingletonBuilder()
    .withConfig(internalConfig)
    .withTimeUnitsImpl(timeUnitsImpl)
    .withDatePickerState(datePickerState)
    .withCalendarEvents(calendarEvents)
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

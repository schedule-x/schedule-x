/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import CalendarAppSingletonImpl from './calendar-app-singleton.impl'
import DatePickerState from '@schedule-x/date-picker/src/utils/stateful/date-picker-state/date-picker-state.interface'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { TranslateFn } from '@schedule-x/translations/src'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import CalendarEvents from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'

export default class CalendarAppSingletonBuilder
  implements Builder<CalendarAppSingleton>
{
  private config: CalendarConfigInternal | undefined
  private timeUnitsImpl: TimeUnits | undefined
  private datePickerState: DatePickerState | undefined
  private calendarState: CalendarState | undefined
  private translate: TranslateFn | undefined
  private datePickerConfig: DatePickerConfigInternal | undefined
  private calendarEvents: CalendarEvents | undefined

  build(): CalendarAppSingleton {
    return new CalendarAppSingletonImpl(
      this.config!,
      this.timeUnitsImpl!,
      this.calendarState!,
      this.datePickerState!,
      this.translate!,
      this.datePickerConfig!,
      this.calendarEvents!
    )
  }

  withConfig(config: CalendarConfigInternal): CalendarAppSingletonBuilder {
    this.config = config
    return this
  }

  withTimeUnitsImpl(timeUnitsImpl: TimeUnits): CalendarAppSingletonBuilder {
    this.timeUnitsImpl = timeUnitsImpl
    return this
  }

  withDatePickerState(
    datePickerState: DatePickerState
  ): CalendarAppSingletonBuilder {
    this.datePickerState = datePickerState
    return this
  }

  withCalendarState(calendarState: CalendarState): CalendarAppSingletonBuilder {
    this.calendarState = calendarState
    return this
  }

  withTranslate(translate: TranslateFn): CalendarAppSingletonBuilder {
    this.translate = translate
    return this
  }

  withDatePickerConfig(
    datePickerConfig: DatePickerConfigInternal
  ): CalendarAppSingletonBuilder {
    this.datePickerConfig = datePickerConfig
    return this
  }

  withCalendarEvents(
    calendarEvents: CalendarEvents
  ): CalendarAppSingletonBuilder {
    this.calendarEvents = calendarEvents
    return this
  }
}

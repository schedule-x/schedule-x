/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarAppSingleton from './calendar-app-singleton'
import CalendarAppSingletonImpl from './calendar-app-singleton.impl'
import DatePickerState from '../../../../../../shared/utils/stateful/date-picker-state/date-picker-state.interface'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import { TranslateFn } from '@schedule-x/translations/src'
import CalendarConfigInternal from '../config/calendar-config'
import CalendarState from '../calendar-state/calendar-state.interface'
import DatePickerConfigInternal from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import CalendarEvents from '../calendar-events/calendar-events.interface'

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

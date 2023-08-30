import Builder from '../../../../../../shared/interfaces/builder.interface'
import CalendarAppSingleton from './calendar-app-singleton'
import CalendarAppSingletonImpl from './calendar-app-singleton.impl'
import DatePickerState from '../../../../../../shared/utils/stateful/date-picker-state/date-picker-state.interface'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import { TranslateFn } from '@schedule-x/translations/src'
import CalendarConfigInternal from '../config/calendar-config'

export default class CalendarAppSingletonBuilder
  implements Builder<CalendarAppSingleton>
{
  private config: CalendarConfigInternal | undefined
  private timeUnitsImpl: TimeUnits | undefined
  private datePickerState: DatePickerState | undefined
  private translate: TranslateFn | undefined

  build(): CalendarAppSingleton {
    return new CalendarAppSingletonImpl(
      this.config!,
      this.timeUnitsImpl!,
      this.datePickerState!,
      this.translate!
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

  withTranslate(translate: TranslateFn): CalendarAppSingletonBuilder {
    this.translate = translate
    return this
  }
}

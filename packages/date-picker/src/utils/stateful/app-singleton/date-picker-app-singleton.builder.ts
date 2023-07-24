/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../../../shared/interfaces/builder.interface'
import DatePickerAppSingleton from './date-picker-app.singleton'
import DatePickerAppSingletonImpl from './date-picker-app-singleton.impl'
import DatePickerState from '../../../../../../shared/utils/stateful/date-picker-state/date-picker-state.interface'
import DatePickerConfig from '../config/config.interface'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'

export default class DatePickerAppSingletonBuilder
  implements Builder<DatePickerAppSingleton>
{
  private datePickerState: DatePickerState | undefined
  private config: DatePickerConfig | undefined
  private timeUnitsImpl: TimeUnits | undefined

  build(): DatePickerAppSingleton {
    return new DatePickerAppSingletonImpl(
      this.datePickerState!,
      this.config!,
      this.timeUnitsImpl!
    )
  }

  withDatePickerState(
    datePickerState: DatePickerState
  ): DatePickerAppSingletonBuilder {
    this.datePickerState = datePickerState
    return this
  }

  withConfig(config: DatePickerConfig): DatePickerAppSingletonBuilder {
    this.config = config
    return this
  }

  withTimeUnitsImpl(timeUnitsImpl: TimeUnits): DatePickerAppSingletonBuilder {
    this.timeUnitsImpl = timeUnitsImpl
    return this
  }
}

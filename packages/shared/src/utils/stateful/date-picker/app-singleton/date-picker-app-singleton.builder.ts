/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Builder from '../../../../interfaces/builder.interface'
import DatePickerAppSingleton from '../../../../interfaces/date-picker/date-picker-app.singleton'
import DatePickerAppSingletonImpl from './date-picker-app-singleton.impl'
import DatePickerState from '../../../../interfaces/date-picker/date-picker-state.interface'
import DatePickerConfigInternal from '../../../../interfaces/date-picker/config.interface'
import TimeUnits from '../../time-units/time-units.interface'
import { TranslateFn } from '../../../../types/translations'

export default class DatePickerAppSingletonBuilder
  implements Builder<DatePickerAppSingleton>
{
  private datePickerState: DatePickerState | undefined
  private config: DatePickerConfigInternal | undefined
  private timeUnitsImpl: TimeUnits | undefined
  private translate: TranslateFn | undefined

  build(): DatePickerAppSingleton {
    return new DatePickerAppSingletonImpl(
      this.datePickerState!,
      this.config!,
      this.timeUnitsImpl!,
      this.translate!
    )
  }

  withDatePickerState(
    datePickerState: DatePickerState
  ): DatePickerAppSingletonBuilder {
    this.datePickerState = datePickerState
    return this
  }

  withConfig(config: DatePickerConfigInternal): DatePickerAppSingletonBuilder {
    this.config = config
    return this
  }

  withTimeUnitsImpl(timeUnitsImpl: TimeUnits): DatePickerAppSingletonBuilder {
    this.timeUnitsImpl = timeUnitsImpl
    return this
  }

  withTranslate(translate: TranslateFn): DatePickerAppSingletonBuilder {
    this.translate = translate
    return this
  }
}

import DatePickerState from '../../../../interfaces/date-picker/date-picker-state.interface'
import DatePickerConfigInternal from '../../../../interfaces/date-picker/config.interface'
import TimeUnits from '../../time-units/time-units.interface'
import DatePickerAppSingleton from '../../../../interfaces/date-picker/date-picker-app.singleton'
import { TranslateFn } from '../../../../types/translations'

export default class DatePickerAppSingletonImpl
  implements DatePickerAppSingleton
{
  constructor(
    public datePickerState: DatePickerState,
    public config: DatePickerConfigInternal,
    public timeUnitsImpl: TimeUnits,
    public translate: TranslateFn
  ) {}
}

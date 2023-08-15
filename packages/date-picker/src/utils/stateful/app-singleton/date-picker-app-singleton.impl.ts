import DatePickerState from '../../../../../../shared/utils/stateful/date-picker-state/date-picker-state.interface'
import DatePickerConfigInternal from '../config/config.interface'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import DatePickerAppSingleton from './date-picker-app.singleton'
import { TranslateFn } from '@schedule-x/translations'

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

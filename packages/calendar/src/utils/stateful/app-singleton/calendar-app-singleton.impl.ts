import CalendarAppSingleton from './calendar-app-singleton'
import CalendarConfigInternal from '../config/calendar-config'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import DatePickerState from '../../../../../../shared/utils/stateful/date-picker-state/date-picker-state.interface'
import { TranslateFn } from '@schedule-x/translations/src'

export default class CalendarAppSingletonImpl implements CalendarAppSingleton {
  constructor(
    public config: CalendarConfigInternal,
    public timeUnitsImpl: TimeUnits,
    public datePickerState: DatePickerState,
    public translate: TranslateFn
  ) {}
}

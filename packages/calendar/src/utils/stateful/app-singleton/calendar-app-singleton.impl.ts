import CalendarAppSingleton from './calendar-app-singleton'
import CalendarConfigInternal from '../config/calendar-config'
import TimeUnits from '../../../../../../shared/utils/stateful/time-units/time-units.interface'
import DatePickerState from '@schedule-x/date-picker/src/utils/stateful/date-picker-state/date-picker-state.interface'
import { TranslateFn } from '@schedule-x/translations/src'
import CalendarState from '../calendar-state/calendar-state.interface'
import DatePickerConfigInternal from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import CalendarEvents from '../calendar-events/calendar-events.interface'

export default class CalendarAppSingletonImpl implements CalendarAppSingleton {
  constructor(
    public config: CalendarConfigInternal,
    public timeUnitsImpl: TimeUnits,
    public calendarState: CalendarState,
    public datePickerState: DatePickerState,
    public translate: TranslateFn,
    public datePickerConfig: DatePickerConfigInternal,
    public calendarEvents: CalendarEvents
  ) {}
}

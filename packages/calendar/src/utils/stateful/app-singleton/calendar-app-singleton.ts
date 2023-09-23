import AppSingleton from '../../../../../shared/src/interfaces/app-singleton.interface'
import CalendarConfigInternal from '../config/calendar-config'
import CalendarState from '../calendar-state/calendar-state.interface'
import DatePickerConfigInternal from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import CalendarEvents from '../calendar-events/calendar-events.interface'

export default interface CalendarAppSingleton extends AppSingleton {
  config: CalendarConfigInternal
  datePickerConfig: DatePickerConfigInternal
  calendarState: CalendarState
  calendarEvents: CalendarEvents
}

import AppSingleton from '../app-singleton.interface'
import CalendarConfigInternal from './calendar-config'
import CalendarState from './calendar-state.interface'
import DatePickerConfigInternal from '../date-picker/config.interface'
import CalendarEvents from './calendar-events.interface'
import CalendarElements from './calendar-elements.interface'

export default interface CalendarAppSingleton extends AppSingleton {
  config: CalendarConfigInternal
  datePickerConfig: DatePickerConfigInternal
  calendarState: CalendarState
  calendarEvents: CalendarEvents
  elements: CalendarElements
}

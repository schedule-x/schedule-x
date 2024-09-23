import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import DatePickerState from '@schedule-x/shared/src/interfaces/date-picker/date-picker-state.interface'
import { TranslateFn } from '@schedule-x/shared/src/types/translations'
import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import CalendarEvents from '@schedule-x/shared/src/interfaces/calendar/calendar-events.interface'
import CalendarElements from '@schedule-x/shared/src/interfaces/calendar/calendar-elements.interface'

export default class CalendarAppSingletonImpl implements CalendarAppSingleton {
  constructor(
    public config: CalendarConfigInternal,
    public calendarState: CalendarState,
    public datePickerState: DatePickerState,
    public translate: TranslateFn,
    public datePickerConfig: DatePickerConfigInternal,
    public calendarEvents: CalendarEvents,
    public elements: CalendarElements = { calendarWrapper: undefined }
  ) {}
}

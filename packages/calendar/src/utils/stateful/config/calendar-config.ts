import Config from '../../../../../../shared/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'
import CalendarEventExternal from '../calendar-event/calendar-event.interface'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '../../../types/config/day-boundaries'

export default interface CalendarConfigInternal extends Config {
  defaultView: ViewName
  views: View[]
  dayBoundaries: DayBoundariesInternal
  isHybridDay: boolean
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

interface ReducedCalendarConfigInternal
  extends Omit<CalendarConfigInternal, 'dayBoundaries' | 'isHybridDay'> {}

export interface CalendarConfigExternal
  extends Partial<ReducedCalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
  dayBoundaries?: DayBoundariesExternal
}

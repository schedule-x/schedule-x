import Config from '../../../../../../shared/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'
import CalendarEventExternal from '../calendar-event/calendar-event.interface'

export default interface CalendarConfigInternal extends Config {
  defaultView: ViewName
  views: View[]
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

export interface CalendarConfigExternal
  extends Partial<CalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
}

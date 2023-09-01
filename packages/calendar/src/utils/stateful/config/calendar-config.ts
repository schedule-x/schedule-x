import Config from '../../../../../../shared/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import { View } from '../../../types/view'

export default interface CalendarConfigInternal extends Config {
  defaultView: View
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

export interface CalendarConfigExternal
  extends Partial<CalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
}

import Config from '../../../../../../shared/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'

export default interface CalendarConfigInternal extends Config {}

export interface CalendarConfigExternal
  extends Partial<CalendarConfigInternal> {
  datePicker?: DatePickerConfigExternal
}

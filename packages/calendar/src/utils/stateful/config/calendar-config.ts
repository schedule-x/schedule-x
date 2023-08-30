import Config from '../../../../../../shared/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'

export default interface CalendarConfigInternal extends Config {
  datePickerConfig: DatePickerConfigExternal
}

export interface CalendarConfigExternal
  extends Partial<CalendarConfigInternal> {}

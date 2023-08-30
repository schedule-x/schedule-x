import CalendarConfigInternal from './calendar-config'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '../../../../../../shared/values'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK
  ) {}
}

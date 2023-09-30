import DatePickerConfigInternal from '@schedule-x/shared/src/interfaces/date-picker/config.interface'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'
import { DatePickerListeners } from '@schedule-x/shared/src/interfaces/date-picker/listeners.interface'
import { DatePickerStyle } from '@schedule-x/shared/src/interfaces/date-picker/style.interface'

export class ConfigImpl implements DatePickerConfigInternal {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public min: string = toDateString(new Date(1970, 0, 1)),
    public max: string = toDateString(
      new Date(new Date().getFullYear() + 1, 11, 31)
    ),
    public placement: Placement = Placement.BOTTOM_START,
    public listeners: DatePickerListeners = {},
    public style: DatePickerStyle = {}
  ) {}
}

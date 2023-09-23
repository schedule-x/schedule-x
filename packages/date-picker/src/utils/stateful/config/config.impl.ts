import DatePickerConfigInternal from './config.interface'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { Placement } from '../../../enums/placement.enum'
import { DatePickerListeners } from './listeners.interface'
import { DatePickerStyle } from './style.interface'

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

import DatePickerConfigInternal from './config.interface'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '../../../../../../shared/values'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import { toDateString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { Placement } from '../../../enums/placement.enum'

export class ConfigImpl implements DatePickerConfigInternal {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public min: string = toDateString(new Date(1970, 0, 1)),
    public max: string = toDateString(
      new Date(new Date().getFullYear() + 1, 11, 31)
    ),
    public placement: Placement = Placement.BOTTOM
  ) {}
}

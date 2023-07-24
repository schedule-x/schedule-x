import DatePickerConfig from './config.interface'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '../../../../../../shared/values'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'

export class ConfigImpl implements DatePickerConfig {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK
  ) {}
}

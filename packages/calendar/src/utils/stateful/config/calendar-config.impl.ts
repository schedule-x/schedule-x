import CalendarConfigInternal from './calendar-config'
import { WeekDay } from '../../../../../../shared/enums/time/week-day.enum'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '../../../../../../shared/values'
import { ViewName } from '../../../types/view-name'
import { InternalViewName } from '../../../enums/internal-view.enum'
import { View } from '../../../types/view'
import { DayBoundariesInternal } from '../../../types/config/day-boundaries'
import { DEFAULT_DAY_BOUNDARIES } from '../../../constants'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public defaultView: ViewName = InternalViewName.Week,
    public views: View[] = [],
    public dayBoundaries: DayBoundariesInternal = DEFAULT_DAY_BOUNDARIES
  ) {}
}

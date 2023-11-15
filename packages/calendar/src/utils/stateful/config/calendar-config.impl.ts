import CalendarConfigInternal, {
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { ViewName } from '../../../types/view-name'
import { InternalViewName } from '../../../enums/internal-view.enum'
import { View } from '../../../types/view'
import { DayBoundariesInternal } from '../../../types/config/day-boundaries'
import {
  DEFAULT_DAY_BOUNDARIES,
  DEFAULT_WEEK_GRID_HEIGHT,
} from '../../../constants'
import { timePointsPerDay } from '@schedule-x/shared/src/utils/stateless/time/time-points/time-points-per-day'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public defaultView: ViewName = InternalViewName.Week,
    public views: View[] = [],
    public dayBoundaries: DayBoundariesInternal = DEFAULT_DAY_BOUNDARIES,
    public weekOptions: WeekOptions = {
      gridHeight: DEFAULT_WEEK_GRID_HEIGHT,
    },
    public calendars = {},
    public plugins = {},
    public isDark = false
  ) {}

  get isHybridDay(): boolean {
    return (
      this.dayBoundaries.start > this.dayBoundaries.end ||
      (this.dayBoundaries.start !== 0 &&
        this.dayBoundaries.start === this.dayBoundaries.end)
    )
  }

  get timePointsPerDay(): number {
    return timePointsPerDay(
      this.dayBoundaries.start,
      this.dayBoundaries.end,
      this.isHybridDay
    )
  }
}

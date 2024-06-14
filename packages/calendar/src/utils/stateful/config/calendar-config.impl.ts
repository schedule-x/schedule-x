import CalendarConfigInternal, {
  CalendarType,
  MonthGridOptions,
  WeekOptions,
} from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  DEFAULT_LOCALE,
} from '@schedule-x/shared/src/values'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import { DayBoundariesInternal } from '@schedule-x/shared/src/types/calendar/day-boundaries'
import {
  DEFAULT_DAY_BOUNDARIES,
  DEFAULT_WEEK_GRID_HEIGHT,
} from '../../../constants'
import { timePointsPerDay } from '@schedule-x/shared/src/utils/stateless/time/time-points/time-points-per-day'
import { Signal, signal } from '@preact/signals'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  calendars: Signal<Record<string, CalendarType>>

  constructor(
    public locale: string = DEFAULT_LOCALE,
    public firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public defaultView: ViewName = InternalViewName.Week,
    public views: View[] = [],
    public dayBoundaries: DayBoundariesInternal = DEFAULT_DAY_BOUNDARIES,
    public weekOptions: WeekOptions = {
      gridHeight: DEFAULT_WEEK_GRID_HEIGHT,
    },
    calendars = {},
    public plugins = {},
    public isDark = false,
    public isResponsive = true,
    public callbacks = {},
    public _customComponentFns = {},
    public minDate: string | undefined = undefined,
    public maxDate: string | undefined = undefined,
    public monthGridOptions: MonthGridOptions = {
      nEventsPerDay: 4,
    }
  ) {
    this.calendars = signal(calendars)
  }

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

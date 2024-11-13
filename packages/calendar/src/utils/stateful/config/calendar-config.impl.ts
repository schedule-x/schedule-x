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
import { DEFAULT_DAY_BOUNDARIES } from '../../../constants'
import { timePointsPerDay } from '@schedule-x/shared/src/utils/stateless/time/time-points/time-points-per-day'
import { Signal, signal } from '@preact/signals'
import { CustomLocale } from '../../../../../shared/src/types/customLocale'
import { CalendarCallbacks } from '@schedule-x/shared/src/interfaces/calendar/listeners.interface'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  firstDayOfWeek: Signal<WeekDay>
  views: Signal<View[]>
  dayBoundaries: Signal<DayBoundariesInternal>
  weekOptions: Signal<WeekOptions>
  // @ts-expect-error why
  calendars: Signal<Record<string, CalendarType> | undefined>
  // @ts-expect-error why
  isDark: Signal<boolean | undefined>
  minDate: Signal<string | undefined>
  maxDate: Signal<string | undefined>
  // @ts-expect-error why
  monthGridOptions: Signal<MonthGridOptions | undefined>
  locale: Signal<string> = signal(DEFAULT_LOCALE)
  customLocale: Signal<CustomLocale | undefined>

  constructor(
    locale: string = DEFAULT_LOCALE,
    customLocale: CustomLocale | undefined,
    firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public defaultView: ViewName = InternalViewName.Week,
    views: View[] = [],
    dayBoundaries: DayBoundariesInternal = DEFAULT_DAY_BOUNDARIES,
    weekOptions: WeekOptions,
    calendars?: Record<string, CalendarType> | undefined,
    public plugins = {},
    isDark?: boolean | undefined,
    public isResponsive?: boolean | undefined,
    public callbacks?: CalendarCallbacks | undefined,
    public _customComponentFns = {},
    minDate: string | undefined = undefined,
    maxDate: string | undefined = undefined,
    monthGridOptions?: MonthGridOptions | undefined
  ) {
    this.locale = signal(locale)
    this.customLocale = signal(customLocale)
    this.firstDayOfWeek = signal(firstDayOfWeek)
    this.views = signal(views)
    this.dayBoundaries = signal(dayBoundaries)
    this.weekOptions = signal(weekOptions)
    this.calendars = signal(calendars)
    this.isDark = signal(isDark)
    this.minDate = signal(minDate)
    this.maxDate = signal(maxDate)
    this.monthGridOptions = signal(monthGridOptions)
  }

  get isHybridDay(): boolean {
    return (
      this.dayBoundaries.value.start > this.dayBoundaries.value.end ||
      (this.dayBoundaries.value.start !== 0 &&
        this.dayBoundaries.value.start === this.dayBoundaries.value.end)
    )
  }

  get timePointsPerDay(): number {
    return timePointsPerDay(
      this.dayBoundaries.value.start,
      this.dayBoundaries.value.end,
      this.isHybridDay
    )
  }
}

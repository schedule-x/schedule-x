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
import { Language } from '@schedule-x/shared/src/types/translations/language.translations'
import { getDirection } from '../../stateless/get-direction'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export default class CalendarConfigImpl implements CalendarConfigInternal {
  firstDayOfWeek: Signal<WeekDay>
  views: Signal<View[]>
  dayBoundaries: Signal<DayBoundariesInternal>
  weekOptions: Signal<WeekOptions>
  calendars: Signal<Record<string, CalendarType>>
  isDark: Signal<boolean>
  minDate: Signal<Temporal.PlainDate | undefined>
  maxDate: Signal<Temporal.PlainDate | undefined>
  monthGridOptions: Signal<MonthGridOptions>
  locale: Signal<string> = signal(DEFAULT_LOCALE)
  theme: string | undefined
  translations: Signal<Record<string, Language>>
  showWeekNumbers: Signal<boolean> = signal(false)
  direction: 'ltr' | 'rtl' = 'ltr'
  timezone: Signal<IANATimezone>

  constructor(
    locale: string = DEFAULT_LOCALE,
    firstDayOfWeek: WeekDay = DEFAULT_FIRST_DAY_OF_WEEK,
    public defaultView: ViewName = InternalViewName.Week,
    views: View[] = [],
    dayBoundaries: DayBoundariesInternal = DEFAULT_DAY_BOUNDARIES,
    weekOptions: WeekOptions,
    calendars = {},
    public plugins = {},
    isDark: boolean = false,
    public isResponsive: boolean = true,
    public callbacks = {},
    public _customComponentFns = {},
    minDate: Temporal.PlainDate | undefined = undefined,
    maxDate: Temporal.PlainDate | undefined = undefined,
    monthGridOptions: MonthGridOptions = {
      nEventsPerDay: 4,
    },
    theme: string | undefined = undefined,
    translations: Record<string, Language> = {},
    showWeekNumbers: boolean = false,
    timezone: IANATimezone = 'UTC'
  ) {
    this.locale = signal(locale)
    this.firstDayOfWeek = signal(firstDayOfWeek)
    this.views = signal(views)
    this.dayBoundaries = signal(dayBoundaries)
    this.weekOptions = signal(weekOptions)
    this.calendars = signal(calendars)
    this.isDark = signal(isDark)
    this.minDate = signal(minDate)
    this.maxDate = signal(maxDate)
    this.monthGridOptions = signal(monthGridOptions)
    this.theme = theme
    this.translations = signal(translations)
    this.showWeekNumbers = signal(showWeekNumbers)
    this.direction = getDirection()
    this.timezone = signal(timezone)
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

import PluginBase from '../plugin.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { DateRange } from '../../types/date-range'
import { WeekDay } from '../../enums/time/week-day.enum'
import { View } from '../../types/calendar/view'
import { DayBoundariesExternal } from '../../types/calendar/day-boundaries'
import {
  CalendarType,
  MonthGridOptions,
  WeekOptions,
} from '../calendar/calendar-config'
import { IANATimezone } from '../../utils/stateless/time/tzdb'

export default interface CalendarControlsPlugin extends PluginBase<string> {
  onRender($app: CalendarAppSingleton): void
  setDate(date: Temporal.PlainDate): void
  setView(view: string): void
  setFirstDayOfWeek(firstDayOfWeek: WeekDay): void
  setLocale(locale: string): void
  setViews(views: [View, ...View[]]): void
  setDayBoundaries(dayBoundaries: DayBoundariesExternal): void
  setWeekOptions(weekOptions: WeekOptions): void
  setCalendars(calendars: Record<string, CalendarType>): void
  setMinDate(minDate: Temporal.PlainDate | undefined): void
  setMaxDate(maxDate: Temporal.PlainDate | undefined): void
  setMonthGridOptions(monthGridOptions: MonthGridOptions): void
  setTimezone(timezone: IANATimezone): void
  getDate(): Temporal.PlainDate
  getView(): string
  getFirstDayOfWeek(): WeekDay
  getLocale(): string
  getViews(): View[]
  getDayBoundaries(): DayBoundariesExternal
  getWeekOptions(): WeekOptions
  getCalendars(): Record<string, CalendarType>
  getMinDate(): Temporal.PlainDate | undefined
  getMaxDate(): Temporal.PlainDate | undefined
  getMonthGridOptions(): MonthGridOptions
  getRange(): DateRange | null
}

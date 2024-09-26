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

export default interface CalendarControlsPlugin extends PluginBase<string> {
  onRender($app: CalendarAppSingleton): void
  setDate(date: string): void
  setView(view: string): void
  setFirstDayOfWeek(firstDayOfWeek: WeekDay): void
  setLocale(locale: string): void
  setViews(views: [View, ...View[]]): void
  setDayBoundaries(dayBoundaries: DayBoundariesExternal): void
  setWeekOptions(weekOptions: WeekOptions): void
  setCalendars(calendars: Record<string, CalendarType>): void
  setMinDate(minDate: string | undefined): void
  setMaxDate(maxDate: string | undefined): void
  setMonthGridOptions(monthGridOptions: MonthGridOptions): void
  getDate(): string
  getView(): string
  getFirstDayOfWeek(): WeekDay
  getLocale(): string
  getViews(): View[]
  getDayBoundaries(): DayBoundariesExternal
  getWeekOptions(): WeekOptions
  getCalendars(): Record<string, CalendarType>
  getMinDate(): string | undefined
  getMaxDate(): string | undefined
  getMonthGridOptions(): MonthGridOptions
  getRange(): DateRange | null
}

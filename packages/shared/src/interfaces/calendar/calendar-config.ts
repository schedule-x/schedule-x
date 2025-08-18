import Config from '../config.interface'
import { DatePickerConfigExternal } from '../date-picker/config.interface'
import { ViewName } from '../../types/calendar/view-name'
import { View } from '../../types/calendar/view'
import CalendarEventExternal from './calendar-event.interface'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '../../types/calendar/day-boundaries'
import DragAndDropPlugin from '../drag-and-drop/drag-and-drop-plugin.interface'
import PluginBase from '../plugin.interface'
import EventModalPlugin from '../event-modal/event-modal.plugin'
import { CalendarCallbacks } from './listeners.interface'
import { CustomComponentFns } from './custom-component-fns'
import { EventRecurrencePlugin } from '../event-recurrence/event-recurrence-plugin.interface'
import { ResizePlugin } from '../resize/resize-plugin.interface'
import { Signal } from '@preact/signals'
import { WeekDay } from '../../enums/time/week-day.enum'
import { BackgroundEvent } from './background-event'
import { Language } from '../../types/translations/language.translations'
import { IANATimezone } from '../../utils/stateless/time/tzdb'
import TimezoneSelectPlugin from '../timezone-select/timezone-select-plugin'

export type WeekOptions = {
  gridHeight: number
  nDays: number
  eventWidth: number
  timeAxisFormatOptions: Intl.DateTimeFormatOptions
  eventOverlap: boolean
}

export type MonthGridOptions = {
  nEventsPerDay: number
}

export type ColorDefinition = {
  main: string
  container: string
  onContainer: string
}

export type CalendarType = {
  colorName: string
  label?: string
  lightColors?: ColorDefinition
  darkColors?: ColorDefinition
}

export type Plugins = {
  dragAndDrop?: DragAndDropPlugin
  eventModal?: EventModalPlugin
  scrollController?: PluginBase<string>
  eventRecurrence?: EventRecurrencePlugin
  resize?: ResizePlugin
  timezoneSelect?: TimezoneSelectPlugin
  [key: string]: PluginBase<string> | undefined
}

export type CustomComponentFn = (
  wrapperElement: HTMLElement,
  props: Record<string, unknown>
) => void

export default interface CalendarConfigInternal extends Config {
  theme: string | undefined
  defaultView: ViewName
  views: Signal<View[]>
  dayBoundaries: Signal<DayBoundariesInternal>
  weekOptions: Signal<WeekOptions>
  calendars: Signal<Record<string, CalendarType>>
  isDark: Signal<boolean>
  minDate: Signal<Temporal.PlainDate | undefined>
  maxDate: Signal<Temporal.PlainDate | undefined>
  monthGridOptions: Signal<MonthGridOptions>
  plugins: Plugins
  isResponsive: boolean
  showWeekNumbers: Signal<boolean>
  callbacks: CalendarCallbacks
  _customComponentFns: CustomComponentFns
  translations: Signal<Record<string, Language>>
  direction: 'ltr' | 'rtl'

  // Getters
  isHybridDay: boolean
  timePointsPerDay: number
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

interface ReducedCalendarConfigInternal
  extends Omit<
    CalendarConfigInternal,
    | 'events'
    | 'dayBoundaries'
    | 'isHybridDay'
    | 'plugins'
    | 'views'
    | '_customComponentFns'
    | 'calendars'
    | 'weekOptions'
    | 'isDark'
    | 'minDate'
    | 'maxDate'
    | 'monthGridOptions'
    | 'locale'
    | 'firstDayOfWeek'
    | 'translations'
    | 'showWeekNumbers'
    | 'direction'
    | 'timezone'
  > {}

export interface CalendarConfigExternal
  extends Partial<ReducedCalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
  backgroundEvents?: BackgroundEvent[]
  dayBoundaries?: DayBoundariesExternal
  views: [View, ...View[]]
  selectedDate?: Temporal.PlainDate
  plugins?: PluginBase<string>[]
  calendars?: Record<string, CalendarType>
  weekOptions?: Partial<WeekOptions>
  isDark?: boolean
  minDate?: Temporal.PlainDate | undefined
  maxDate?: Temporal.PlainDate | undefined
  monthGridOptions?: MonthGridOptions
  locale?: string
  firstDayOfWeek?: WeekDay
  skipValidation?: boolean
  translations?: Record<string, Language>
  showWeekNumbers?: boolean
  timezone?: IANATimezone
}

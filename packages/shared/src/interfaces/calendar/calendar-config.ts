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

export type WeekOptions = {
  gridHeight: number
}

export type ColorDefinition = {
  main: string
  container: string
  onContainer: string
}

export type CalendarType = {
  colorName: string
  lightColors?: ColorDefinition
  darkColors?: ColorDefinition
}

export type Plugins = {
  dragAndDrop?: DragAndDropPlugin
  eventModal?: EventModalPlugin
  scrollController?: PluginBase
  eventRecurrence?: EventRecurrencePlugin
  resize?: ResizePlugin
  [key: string]: PluginBase | undefined
}

export type CustomComponentFn = (
  wrapperElement: HTMLElement,
  props: Record<string, unknown>
) => void

export default interface CalendarConfigInternal extends Config {
  defaultView: ViewName
  views: View[]
  dayBoundaries: DayBoundariesInternal
  weekOptions: WeekOptions
  calendars?: Record<string, CalendarType>
  plugins: Plugins
  isDark: boolean
  callbacks: CalendarCallbacks
  _customComponentFns: CustomComponentFns

  // Getters
  isHybridDay: boolean
  timePointsPerDay: number
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

interface ReducedCalendarConfigInternal
  extends Omit<
    CalendarConfigInternal,
    | 'dayBoundaries'
    | 'isHybridDay'
    | 'plugins'
    | 'views'
    | '_customComponentFns'
  > {}

export interface CalendarConfigExternal
  extends Partial<ReducedCalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
  dayBoundaries?: DayBoundariesExternal
  plugins?: PluginBase[]
  views: [View, ...View[]]
  selectedDate?: string
}

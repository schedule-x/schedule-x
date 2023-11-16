import Config from '../config.interface'
import { DatePickerConfigExternal } from '../date-picker/config.interface'
import { ViewName } from '../../types/calendar/view-name'
import { View } from '../../types/calendar/view'
import CalendarEventExternal from './calendar-event.interface'
import {
  DayBoundariesInternal,
  DayBoundariesExternal,
} from '../../types/calendar/day-boundaries'
import DragAndDropPlugin from '../drag-and-drop/drag-and-drop-plugin.interface'
import PluginBase from '../plugin.interface'
import EventModalPlugin from '../event-modal/event-modal.plugin'

export type WeekOptions = {
  gridHeight: number
}

// Extend with field "label" when implementing calendar picker
export type CalendarType = {
  color: string
}

export type Plugins = {
  dragAndDrop?: DragAndDropPlugin
  eventModal?: EventModalPlugin
}

export default interface CalendarConfigInternal extends Config {
  defaultView: ViewName
  views: View[]
  dayBoundaries: DayBoundariesInternal
  weekOptions: WeekOptions
  calendars?: Record<string, CalendarType>
  plugins: Plugins
  isDark: boolean

  // Getters
  isHybridDay: boolean
  timePointsPerDay: number
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

interface ReducedCalendarConfigInternal
  extends Omit<
    CalendarConfigInternal,
    'dayBoundaries' | 'isHybridDay' | 'plugins' | 'views'
  > {}

export interface CalendarConfigExternal
  extends Partial<ReducedCalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
  dayBoundaries?: DayBoundariesExternal
  plugins?: PluginBase[]
  views: [View, ...View[]]
}

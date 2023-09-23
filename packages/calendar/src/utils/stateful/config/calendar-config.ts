import Config from '@schedule-x/shared/src/interfaces/config.interface'
import { DatePickerConfigExternal } from '@schedule-x/date-picker/src/utils/stateful/config/config.interface'
import { ViewName } from '../../../types/view-name'
import { View } from '../../../types/view'
import CalendarEventExternal from '../calendar-event/calendar-event.interface'
import {
  DayBoundariesExternal,
  DayBoundariesInternal,
} from '../../../types/config/day-boundaries'
import { DragAndDropPlugin } from '@schedule-x/drag-and-drop/src'
import Plugin from '@schedule-x/shared/src/interfaces/plugin.interface'

export type WeekOptions = {
  gridHeight: number
}

// Extend with field "label" when implementing calendar picker
export type CalendarType = {
  color: string
}

export type Plugins = {
  dragAndDrop?: DragAndDropPlugin
}

export default interface CalendarConfigInternal extends Config {
  defaultView: ViewName
  views: View[]
  dayBoundaries: DayBoundariesInternal
  weekOptions: WeekOptions
  calendars?: Record<string, CalendarType>
  plugins: Plugins

  // Getters
  isHybridDay: boolean
  timePointsPerDay: number
}

interface CalendarDatePickerConfigExternal
  extends Omit<DatePickerConfigExternal, 'listeners' | 'placement'> {}

interface ReducedCalendarConfigInternal
  extends Omit<
    CalendarConfigInternal,
    'dayBoundaries' | 'isHybridDay' | 'plugins'
  > {}

export interface CalendarConfigExternal
  extends Partial<ReducedCalendarConfigInternal> {
  datePicker?: CalendarDatePickerConfigExternal
  events?: CalendarEventExternal[]
  dayBoundaries?: DayBoundariesExternal
  plugins?: Plugin[]
}

import CalendarAppSingleton from './interfaces/calendar/calendar-app-singleton'
import type CalendarEvent from './interfaces/calendar/calendar-event.interface'
import type { CalendarEventInternal } from './interfaces/calendar/calendar-event.interface'
import type EventModalPlugin from './interfaces/event-modal/event-modal.plugin'
import type TimezoneSelectPlugin from './interfaces/timezone-select/timezone-select-plugin'
import type CalendarConfigInternal from './interfaces/calendar/calendar-config'
import type CalendarState from './interfaces/calendar/calendar-state.interface'
import type CalendarEvents from './interfaces/calendar/calendar-events.interface'
import type DragAndDropPlugin from './interfaces/drag-and-drop/drag-and-drop-plugin.interface'
import type TimeGridDragHandler from './interfaces/drag-and-drop/time-grid-drag-handler.interface'
import type DateGridDragHandler from './interfaces/drag-and-drop/date-grid-drag-handler.interface'
import type MonthGridDragHandler from './interfaces/drag-and-drop/month-grid-drag-handler.interface'
import type DragHandlerDependencies from './interfaces/drag-and-drop/drag-handler-dependencies.interface'
import type { ResizePlugin } from './interfaces/resize/resize-plugin.interface'
import type { EventCoordinates } from './interfaces/shared/event-coordinates'
import TimeIcon from './components/icons/time-icon'
import UserIcon from './components/icons/user-icon'
import DescriptionIcon from './components/icons/description-icon'
import LocationPinIcon from './components/icons/location-pin-icon'
import PluginBase from './interfaces/plugin.interface'

export { definePlugin } from './utils/stateless/calendar/define-plugin'
export { deepCloneEvent } from './utils/stateless/calendar/deep-clone-event'
export { getTimePointsPerPixel } from './utils/stateless/calendar/time-points-per-pixel'
export { getTimeGridDayWidth } from './utils/stateless/calendar/get-time-grid-day-width'
export { getTimeGridEventCopyElementId } from './utils/stateless/strings/selector-generators'
export { getEventCoordinates } from './utils/stateless/dom/get-event-coordinates'
export { isUIEventTouchEvent } from './utils/stateless/dom/is-touch-event'
export { concatenatePeople } from './utils/stateless/strings/concatenate-people'
export {
  getTimeStamp,
  getLocalizedDate,
  timeFn,
} from './utils/stateless/time/date-time-localization/get-time-stamp'
export { getDayNameShort } from './utils/stateless/time/date-time-localization/date-time-localization'
export { isToday } from './utils/stateless/time/comparison'
export { TimeIcon, UserIcon, DescriptionIcon, LocationPinIcon }
export { randomStringId } from './utils/stateless/strings/random'
export { nextTick } from './utils/stateless/next-tick'
export { focusModal } from './utils/stateless/events/focus-modal'
export { invokeOnEventClickCallback } from './utils/stateless/events/invoke-on-event-click-callback'
export { invokeOnEventDoubleClickCallback } from './utils/stateless/events/invoke-on-event-double-click-callback'
export {
  toTimeString,
  toDateTimeString,
} from './utils/stateless/time/format-conversion/date-to-strings'
export { dateStringRegex } from './utils/stateless/time/validation/regex'
export { toDateString } from './utils/stateless/time/format-conversion/date-to-strings'
export {
  toJSDate,
  toIntegers,
} from './utils/stateless/time/format-conversion/format-conversion'
export {
  dateFromDateTime,
  timeFromDateTime,
} from './utils/stateless/time/format-conversion/string-to-string'
export type {
  CalendarConfigExternal,
  ResourceGridOptions,
} from './interfaces/calendar/calendar-config'
export type { CalendarConfigInternal }
export type {
  CalendarEvent,
  EventModalPlugin,
  CalendarEventInternal,
  TimezoneSelectPlugin,
}
export type { View, ViewConfig } from './types/calendar/view'
export type { CalendarAppSingleton, PluginBase }
export type { CalendarState }
export type { CalendarEvents }
export type { DragAndDropPlugin }
export type { TimeGridDragHandler }
export type { DateGridDragHandler }
export type { MonthGridDragHandler }
export type { DragHandlerDependencies }
export type { ResizePlugin }
export type { EventCoordinates }
export type { CustomComponentFns as CustomComponents } from './interfaces/calendar/custom-component-fns'
export type { CustomComponentName } from './interfaces/calendar/custom-component-fns'
export {
  addDays,
  addMonths,
  __deprecated__addMinutes as addMinutes,
} from './utils/stateless/time/date-time-mutation/adding'
export { setDateInDateTime } from './utils/stateless/time/date-time-mutation/date-time-mutation'
export { calculateDaysDifference } from './utils/stateless/time/days-difference'
export {
  timeStringFromTimePoints,
  addTimePointsToDateTime,
  timePointsFromString,
} from './utils/stateless/time/time-points/string-conversion'
export { timePointToPercentage } from './utils/stateless/time/interpolation/time-point-to-grid-percentage'
export { getYCoordinateInTimeGrid } from './utils/stateless/calendar/get-y-coordinate-in-time-grid'
export type { DateRange } from './types/date-range'
export type { Resource } from './types/calendar/resource'
export type { BackgroundEvent } from './interfaces/calendar/background-event'
export type { DayBoundariesDateTime } from './types/day-boundaries-date-time'
export type { DayBoundariesInternal } from './types/calendar/day-boundaries'
export type { RangeSetterConfig } from './interfaces/calendar/range-setter-config.interface'
export type { PreactViewComponent } from './types/calendar/preact-view-component'
export { PluginName } from './enums/plugin-name.enum'

// Preact utilities for views
export { AppContext } from './utils/stateful/app-context'
export { createPreactView } from './utils/stateful/preact-view/preact-view'

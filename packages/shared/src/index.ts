import CalendarAppSingleton from './interfaces/calendar/calendar-app-singleton'
import type CalendarEvent from './interfaces/calendar/calendar-event.interface'
import type { CalendarEventInternal } from './interfaces/calendar/calendar-event.interface'
import type EventModalPlugin from './interfaces/event-modal/event-modal.plugin'
import type TimezoneSelectPlugin from './interfaces/timezone-select/timezone-select-plugin'
import type CalendarConfigInternal from './interfaces/calendar/calendar-config'
import TimeIcon from './components/icons/time-icon'
import UserIcon from './components/icons/user-icon'
import DescriptionIcon from './components/icons/description-icon'
import LocationPinIcon from './components/icons/location-pin-icon'
import PluginBase from './interfaces/plugin.interface'

export { definePlugin } from './utils/stateless/calendar/define-plugin'
export { deepCloneEvent } from './utils/stateless/calendar/deep-clone-event'
export { concatenatePeople } from './utils/stateless/strings/concatenate-people'
export {
  getTimeStamp,
  getLocalizedDate,
} from './utils/stateless/time/date-time-localization/get-time-stamp'
export { getDayNameShort } from './utils/stateless/time/date-time-localization/date-time-localization'
export { isToday } from './utils/stateless/time/comparison'
export { TimeIcon, UserIcon, DescriptionIcon, LocationPinIcon }
export { randomStringId } from './utils/stateless/strings/random'
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
export type { CustomComponentFns as CustomComponents } from './interfaces/calendar/custom-component-fns'
export type { CustomComponentName } from './interfaces/calendar/custom-component-fns'
export {
  addDays,
  addMonths,
  __deprecated__addMinutes as addMinutes,
} from './utils/stateless/time/date-time-mutation/adding'
export { timeStringFromTimePoints } from './utils/stateless/time/time-points/string-conversion'
export { timePointToPercentage } from './utils/stateless/time/interpolation/time-point-to-grid-percentage'
export { getYCoordinateInTimeGrid } from './utils/stateless/calendar/get-y-coordinate-in-time-grid'
export type { DateRange } from './types/date-range'
export type { Resource } from './types/calendar/resource'
export type { BackgroundEvent } from './interfaces/calendar/background-event'
export type { DayBoundariesDateTime } from './types/day-boundaries-date-time'
export type { DayBoundariesInternal } from './types/calendar/day-boundaries'
export type { RangeSetterConfig } from './interfaces/calendar/range-setter-config.interface'
export type { PreactViewComponent } from './types/calendar/preact-view-component'

// Preact utilities for views
export { AppContext } from './utils/stateful/app-context'
export { createPreactView } from './utils/stateful/preact-view/preact-view'

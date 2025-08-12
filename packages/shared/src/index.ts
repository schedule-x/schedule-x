import CalendarAppSingleton from './interfaces/calendar/calendar-app-singleton'
import type CalendarEvent from './interfaces/calendar/calendar-event.interface'
import type { CalendarEventInternal } from './interfaces/calendar/calendar-event.interface'
import type EventModalPlugin from './interfaces/event-modal/event-modal.plugin'
import TimeIcon from './components/icons/time-icon'
import UserIcon from './components/icons/user-icon'
import DescriptionIcon from './components/icons/description-icon'
import LocationPinIcon from './components/icons/location-pin-icon'
import PluginBase from './interfaces/plugin.interface'

export { definePlugin } from './utils/stateless/calendar/define-plugin'
export { deepCloneEvent } from './utils/stateless/calendar/deep-clone-event'
export { concatenatePeople } from './utils/stateless/strings/concatenate-people'
export { getTimeStamp } from './utils/stateless/time/date-time-localization/get-time-stamp'
export { TimeIcon, UserIcon, DescriptionIcon, LocationPinIcon }
export { randomStringId } from './utils/stateless/strings/random'
export {
  toTimeString,
  toDateTimeString,
} from './utils/stateless/time/format-conversion/date-to-strings'
export { dateStringRegex } from './utils/stateless/time/validation/regex'
export { toDateString } from './utils/stateless/time/format-conversion/date-to-strings'
export { toJSDate } from './utils/stateless/time/format-conversion/format-conversion'
export type { CalendarConfigExternal } from './interfaces/calendar/calendar-config'
export type { CalendarEvent, EventModalPlugin, CalendarEventInternal }
export type { View, ViewConfig } from './types/calendar/view'
export type { CalendarAppSingleton, PluginBase }
export type { CustomComponentFns as CustomComponents } from './interfaces/calendar/custom-component-fns'
export type { CustomComponentName } from './interfaces/calendar/custom-component-fns'
export {
  addDays,
  addMonths,
  __deprecated__addMinutes as addMinutes,
} from './utils/stateless/time/date-time-mutation/adding'
export type { DateRange } from './types/date-range'

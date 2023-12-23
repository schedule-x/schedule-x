import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { CustomComponentFn } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

export const getCCID = (
  customComponent: CustomComponentFn | undefined,
  calendarEvent: CalendarEventInternal,
  isCopy: boolean | undefined
) => {
  let customComponentId = customComponent
    ? 'custom-time-grid-event-' + calendarEvent.id
    : undefined
  if (customComponentId && isCopy) customComponentId += '-' + 'copy'
  return customComponentId
}

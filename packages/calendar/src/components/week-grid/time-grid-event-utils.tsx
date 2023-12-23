import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const getCCID = (
  customComponent:
    | ((wrapperElement: HTMLElement, props: Record<string, unknown>) => void)
    | undefined,
  calendarEvent: CalendarEventInternal,
  isCopy: boolean | undefined
) => {
  let customComponentId = customComponent
    ? 'custom-time-grid-event-' + calendarEvent.id
    : undefined
  if (customComponentId && isCopy) customComponentId += '-' + 'copy'
  return customComponentId
}

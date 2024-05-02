import { CustomComponentFn } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

export const getCCID = (
  customComponent: CustomComponentFn | undefined,
  isCopy: boolean | undefined
) => {
  let customComponentId = customComponent
    ? 'custom-time-grid-event-' + randomStringId() // needs a unique string to support event recurrence
    : undefined
  if (customComponentId && isCopy)
    customComponentId += '-' + 'copy' + '-' + calendarEvent.start
  return customComponentId
}

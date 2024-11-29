import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src'

export const testIfShouldAbort = (
  $app: CalendarAppSingleton,

  /**
   * For the month grid the original event is used, since there is no copy created for dragging.
   * For other views, a copy is used, hence the name of this parameter.
   * */
  eventCopyOrOriginalEvent: CalendarEventInternal,

  originalStart: string,
  originalEnd: string,
  updateCopy?: (newCopy: CalendarEventInternal | undefined) => void
): boolean => {
  const onBeforeEventUpdate = $app.config.callbacks.onBeforeEventUpdate
  if (onBeforeEventUpdate) {
    const oldEvent = eventCopyOrOriginalEvent._getExternalEvent()
    oldEvent.start = originalStart
    oldEvent.end = originalEnd
    const newEvent = eventCopyOrOriginalEvent._getExternalEvent()
    const validationResult = onBeforeEventUpdate(oldEvent, newEvent, $app)

    if (!validationResult) {
      updateCopy?.(undefined)
      return true
    }
  }

  return false
}

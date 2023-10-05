import { useState } from 'preact/compat'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { deepCloneEvent } from '../../stateless/events/deep-clone-event'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export default function useDraggableEvent($app: CalendarAppSingleton) {
  const [eventCopy, setEventCopy] = useState<CalendarEventInternal>()
  const updateCopy = (newCopy: CalendarEventInternal | undefined) => {
    if (!newCopy) return setEventCopy(undefined)

    setEventCopy(deepCloneEvent(newCopy, $app))
  }

  const [dragStartTimeout, setDragStartTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >()

  const createDragStartTimeout = (
    callback: (e: MouseEvent) => void,
    mouseEvent: MouseEvent
  ) => {
    setDragStartTimeout(setTimeout(() => callback(mouseEvent), 150))
  }

  const setClickedEventIfNotDragging = (
    calendarEvent: CalendarEventInternal
  ) => {
    if (dragStartTimeout) {
      clearTimeout(dragStartTimeout)
      $app.calendarState.setLastClickedEvent(calendarEvent)
    }
    setDragStartTimeout(undefined)
  }

  return {
    eventCopy,
    updateCopy,
    createDragStartTimeout,
    setClickedEventIfNotDragging,
  }
}

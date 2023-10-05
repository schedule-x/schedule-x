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
    calendarEvent: CalendarEventInternal,
    mouseEvent: MouseEvent
  ) => {
    if (dragStartTimeout) {
      clearTimeout(dragStartTimeout)

      if ($app.config.plugins.eventModal) {
        const eventTarget = mouseEvent.target as HTMLElement
        const targetIsEventElement = eventTarget.classList.contains('sx__event')
        const eventElement = targetIsEventElement
          ? eventTarget
          : eventTarget.closest('.sx__event')
        $app.config.plugins.eventModal.setCalendarEvent(
          calendarEvent,
          eventElement as HTMLElement
        )
      }
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

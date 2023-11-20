import { useState } from 'preact/compat'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { deepCloneEvent } from '../../../../../shared/src/utils/stateless/calendar/deep-clone-event'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export default function useEventInteractions($app: CalendarAppSingleton) {
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

  const setClickedEvent = (
    mouseEvent: MouseEvent,
    calendarEvent: CalendarEventInternal
  ) => {
    if (!$app.config.plugins.eventModal) return

    console.log($app.config.plugins.eventModal.calendarEvent.value)

    const eventTarget = mouseEvent.target as HTMLElement
    const calendarEventElement = eventTarget.classList.contains('sx__event')
      ? eventTarget
      : eventTarget.closest('.sx__event')
    $app.config.plugins.eventModal.setCalendarEvent(
      calendarEvent,
      calendarEventElement as HTMLElement
    )
  }

  const setClickedEventIfNotDragging = (
    calendarEvent: CalendarEventInternal,
    mouseEvent: MouseEvent
  ) => {
    if (dragStartTimeout) {
      clearTimeout(dragStartTimeout)
      setClickedEvent(mouseEvent, calendarEvent)
    }
    setDragStartTimeout(undefined)
  }

  return {
    eventCopy,
    updateCopy,
    createDragStartTimeout,
    setClickedEventIfNotDragging,
    setClickedEvent,
  }
}

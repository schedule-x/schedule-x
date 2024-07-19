import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import EventModal from './event-modal'
import { signal } from '@preact/signals'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const createEventModalPlugin = (): EventModalPlugin => {
  const calendarEvent = signal<CalendarEventInternal | null>(null)
  const calendarEventDOMRect = signal<DOMRect | null>(null)

  return {
    name: PluginName.EventModal,
    calendarEvent,
    calendarEventDOMRect,
    calendarEventElement: signal<HTMLElement | null>(null),
    ComponentFn: EventModal,
    setCalendarEvent: (
      event: CalendarEventInternal,
      eventTargetDOMRect: DOMRect
    ) => {
      calendarEvent.value = event
      calendarEventDOMRect.value = eventTargetDOMRect
    },
    close: () => {
      calendarEvent.value = null
      calendarEventDOMRect.value = null
    },
  }
}

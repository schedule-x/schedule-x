import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import EventModal from './event-modal'
import { signal } from '@preact/signals'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const createEventModalPlugin = (): EventModalPlugin => {
  const calendarEvent = signal<CalendarEventInternal | null>(null)
  const calendarEventDOMRect = signal<DOMRect | null>(null)

  return {
    calendarEventElement: signal<HTMLElement | null>(null),
    name: PluginName.EventModal,
    calendarEvent,
    calendarEventDOMRect,
    ComponentFn: EventModal,
    setCalendarEvent: (
      event: CalendarEventInternal,
      eventTargetDOMReact: DOMRect
    ) => {
      calendarEvent.value = event
      calendarEventDOMRect.value = eventTargetDOMReact
    },
  }
}

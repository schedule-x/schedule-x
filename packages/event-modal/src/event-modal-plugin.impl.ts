import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import EventModal from './event-modal'
import { signal } from '@preact/signals'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'

export const createEventModalPlugin = (): EventModalPlugin => {
  const calendarEvent = signal<CalendarEventInternal | null>(null)
  const calendarEventElement = signal<HTMLElement | null>(null)

  return {
    name: PluginName.EventModal,
    calendarEvent,
    calendarEventElement,
    ComponentFn: EventModal,
    setCalendarEvent: (
      event: CalendarEventInternal,
      eventTarget: HTMLElement
    ) => {
      calendarEvent.value = event
      calendarEventElement.value = eventTarget
    },
  }
}

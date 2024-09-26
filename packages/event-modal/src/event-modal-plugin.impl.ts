import EventModalPlugin from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import EventModal from './event-modal'
import { batch, signal } from '@preact/signals'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'

class EventModalPluginImpl implements EventModalPlugin {
  name = PluginName.EventModal
  calendarEvent = signal<CalendarEventInternal | null>(null)
  calendarEventDOMRect = signal<DOMRect | null>(null)
  calendarEventElement = signal<HTMLElement | null>(null)
  ComponentFn = EventModal

  setCalendarEvent(event: CalendarEventInternal, eventTargetDOMRect: DOMRect) {
    batch(() => {
      this.calendarEvent.value = event
      this.calendarEventDOMRect.value = eventTargetDOMRect
    })
  }

  close() {
    batch(() => {
      this.calendarEvent.value = null
      this.calendarEventDOMRect.value = null
    })
  }
}

export const createEventModalPlugin = () => {
  return definePlugin('eventModal', new EventModalPluginImpl())
}

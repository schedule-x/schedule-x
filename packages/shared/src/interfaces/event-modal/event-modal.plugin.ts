import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { Signal } from '@preact/signals'

export type EventModalProps = {
  $app: CalendarAppSingleton
}

export default interface EventModalPlugin extends PluginBase<string> {
  calendarEvent: Signal<CalendarEventInternal | null>
  calendarEventDOMRect: Signal<DOMRect | null>
  calendarEventElement: Signal<HTMLElement | null>

  close(): void

  setCalendarEvent(
    event: CalendarEventInternal | null,
    eventTargetDOMRect: DOMRect | null
  ): void

  ComponentFn(props: EventModalProps): JSXInternal.Element
}

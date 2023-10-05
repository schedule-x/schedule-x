import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

export type EventModalProps = {
  calendarEvent: CalendarEventInternal
}

export default interface EventModalPlugin extends PluginBase {
  ComponentFn(props: EventModalProps): JSXInternal.Element
}

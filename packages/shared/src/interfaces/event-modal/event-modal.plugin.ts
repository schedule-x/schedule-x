import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'

export type EventModalProps = {
  calendarEvent: CalendarEventInternal
  $app: CalendarAppSingleton
}

export default interface EventModalPlugin extends PluginBase {
  ComponentFn(props: EventModalProps): JSXInternal.Element
}

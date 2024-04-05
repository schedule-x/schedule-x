import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { Signal } from '@preact/signals'

export type SidebarProps = {
  $app: CalendarAppSingleton
}

export default interface SidebarPlugin extends PluginBase {
  isOpen: Signal<boolean>
  ComponentFn(props: SidebarProps): JSXInternal.Element
}

export type SidebarPluginProps = SidebarPlugin

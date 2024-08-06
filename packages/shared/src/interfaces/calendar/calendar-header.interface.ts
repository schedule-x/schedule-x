import PluginBase from '../plugin.interface'
import CalendarAppSingleton from './calendar-app-singleton'
import { Signal } from '@preact/signals'

export type HeaderProps = {
  $app: CalendarAppSingleton
}

export default interface HeaderPlugin extends PluginBase {
  textSwitchBtn: Signal<string>
}

export type HeaderPluginProps = HeaderPlugin

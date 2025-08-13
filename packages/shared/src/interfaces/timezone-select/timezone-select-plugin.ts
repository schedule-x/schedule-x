import PluginBase from '../plugin.interface'
import { JSX } from 'preact'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { Signal } from '@preact/signals'

export type TimezoneSelectProps = {
  $app: CalendarAppSingleton
}

export default interface TimezoneSelectPlugin extends PluginBase<string> {
  onRender($app: CalendarAppSingleton): void
  isEnabled: Signal<boolean>
  ComponentFn(props: TimezoneSelectProps): JSX.Element
  setEnabled(enabled: boolean): void
}

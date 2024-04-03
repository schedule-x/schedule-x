import PluginBase from '../plugin.interface'
import { JSXInternal } from 'preact/src/jsx'
import CalendarAppSingleton from '../calendar/calendar-app-singleton'

export type SidebarProps = {
  $app: CalendarAppSingleton
}

export default interface SidebarPlugin extends PluginBase {
  // profiles: Signal<string[] | null>
  // addresses: Signal<string[] | null>
  // motives: Signal<string[] | null>
  // timeRange: Signal<[Date, Date] | null>

  // setProfiles(profiles: string[] | null): void
  // setAddresses(addresses: string[] | null): void
  // setMotives(motives: string[] | null): void
  // setTimeRange(timeRange: [Date, Date] | null): void

  ComponentFn(props: SidebarProps): JSXInternal.Element
}

import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import Sidebar from './sidebar'
import SidebarPlugin from '@schedule-x/shared/src/interfaces/calendar/calendar-sidebar.interface'

export const createSidebarPlugin = (): SidebarPlugin => {
  // const timeRange = signal<[Date, Date] | null>(null)
  // const profiles = signal<string[] | null>(null)
  // const sidebarAddresses = signal<string[] | null>(null)
  // const motives = signal<string[] | null>(null)
  return {
    name: PluginName.Sidebar,
    // timeRange,
    // profiles,
    // motives,
    // sidebarAddresses,
    // setAddresses: (
    //   addresses: string[],
    // ) => {
    //   sidebarAddresses.value = addresses
    // },
    ComponentFn: Sidebar,
  }
}

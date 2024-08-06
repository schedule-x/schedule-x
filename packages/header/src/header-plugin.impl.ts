import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import HeaderPlugin from '@schedule-x/shared/src/interfaces/calendar/calendar-header.interface'
import { signal } from '@preact/signals'

export const createHeaderPlugin = () // setIsOpen: (value: boolean) => void
: HeaderPlugin => {
  // const timeRange = signal<[Date, Date] | null>(null)
  // const profiles = signal<string[] | null>(null)
  // const sidebarAddresses = signal<string[] | null>(null)
  // const motives = signal<string[] | null>(null)
  return {
    name: PluginName.Header,
    textSwitchBtn: signal(''),
    // setIsOpen,/
    // timeRange,
    // profiles,
    // motives,
    // sidebarAddresses,
    // setAddresses: (
    //   addresses: string[],
    // ) => {
    //   sidebarAddresses.value = addresses
    // },
  }
}

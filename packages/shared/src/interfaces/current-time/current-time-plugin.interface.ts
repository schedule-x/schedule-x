import PluginBase from '../plugin.interface'

export default interface CurrentTimePlugin extends PluginBase<string> {
  reload(): void
}

export type CurrentTimePluginConfig = {
  fullWeekWidth?: boolean
}

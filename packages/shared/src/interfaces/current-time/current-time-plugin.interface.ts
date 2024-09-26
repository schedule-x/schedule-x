import PluginBase from '../plugin.interface'

export default interface CurrentTimePlugin extends PluginBase<string> {}

export type CurrentTimePluginConfig = {
  fullWeekWidth?: boolean
  timeZoneOffset?: number
}

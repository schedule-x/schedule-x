import PluginBase from '../plugin.interface'

export default interface CurrentTimePlugin extends PluginBase {}

export type CurrentTimePluginConfig = {
  fullWeekWidth?: boolean
}

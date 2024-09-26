import { PluginBase } from '@schedule-x/shared/src'

/**
 * TODO v3: remove this when removing plugin over the config object
 * */
export const validatePlugins = (
  configPlugins: PluginBase<string>[] | undefined,
  pluginArg: PluginBase<string>[] | undefined
) => {
  if (configPlugins && pluginArg) {
    throw new Error(
      'You cannot provide plugins over the config object and as an argument to createCalendar.'
    )
  }
}

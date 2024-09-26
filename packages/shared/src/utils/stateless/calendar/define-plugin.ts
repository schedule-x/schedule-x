import PluginBase from '../../../interfaces/plugin.interface'

export const definePlugin = <Name extends string, T extends PluginBase<string>>(
  name: Name,
  definition: T
) => {
  definition.name = name

  return definition as T & { name: Name }
}

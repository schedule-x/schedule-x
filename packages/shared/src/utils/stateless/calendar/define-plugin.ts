export const definePlugin = <Name extends string, T extends object>(
  name: Name,
  definition: T
) => {
  definition.name = name

  return definition as T & { name: Name }
}

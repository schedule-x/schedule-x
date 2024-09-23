import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const initPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.onRender) {
      plugin.onRender($app)
    }
  })
}

export const destroyPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.destroy) plugin.destroy()
  })
}

export const invokePluginsBeforeRender = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.beforeRender) plugin.beforeRender($app)
  })
}

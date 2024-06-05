import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const initPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.init) {
      plugin.init($app)
    }
  })
}

export const destroyPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.destroy) plugin.destroy()
  })
}

export const beforeInitPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.beforeInit) plugin.beforeInit($app)
  })
}

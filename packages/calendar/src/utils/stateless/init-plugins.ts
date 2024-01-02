import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const initPlugins = ($app: CalendarAppSingleton) => {
  Object.values($app.config.plugins).forEach((plugin) => {
    if (plugin?.init) {
      plugin.init($app)
    }
  })
}

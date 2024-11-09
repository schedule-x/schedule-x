import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarConfigBuilder from '../../stateful/config/calendar-config.builder'
import { PluginBase } from '@schedule-x/shared/src'

export const createInternalConfig = (
  config: CalendarConfigExternal,
  plugins: PluginBase<string>[]
) => {
  return new CalendarConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withDefaultView(config.defaultView)
    .withViews(config.views)
    .withDayBoundaries(config.dayBoundaries)
    .withWeekOptions(config.weekOptions)
    .withCalendars(config.calendars)
    .withPlugins(plugins)
    .withIsDark(config.isDark)
    .withIsResponsive(config.isResponsive)
    .withCallbacks(config.callbacks)
    .withMinDate(config.minDate)
    .withMaxDate(config.maxDate)
    .withMonthGridOptions(config.monthGridOptions)
    .withBackgroundEvents(config.backgroundEvents)
    .build()
}

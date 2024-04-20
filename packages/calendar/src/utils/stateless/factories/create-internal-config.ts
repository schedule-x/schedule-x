import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarConfigBuilder from '../../stateful/config/calendar-config.builder'

export const createInternalConfig = (config: CalendarConfigExternal) => {
  return new CalendarConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withDefaultView(config.defaultView)
    .withViews(config.views)
    .withDayBoundaries(config.dayBoundaries)
    .withWeekOptions(config.weekOptions)
    .withCalendars(config.calendars)
    .withPlugins(config.plugins)
    .withIsDark(config.isDark)
    .withCallbacks(config.callbacks)
    .withMinDate(config.minDate)
    .withMaxDate(config.maxDate)
    .withMonthGridOptions(config.monthGridOptions)
    .build()
}

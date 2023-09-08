import { CalendarConfigExternal } from '../../stateful/config/calendar-config'
import CalendarConfigBuilder from '../../stateful/config/calendar-config.builder'

export const createInternalConfig = (config: CalendarConfigExternal) => {
  return new CalendarConfigBuilder()
    .withLocale(config.locale)
    .withFirstDayOfWeek(config.firstDayOfWeek)
    .withDefaultView(config.defaultView)
    .withViews(config.views)
    .withDayBoundaries(config.dayBoundaries)
    .withWeekOptions(config.weekOptions)
    .build()
}

import { CalendarConfigExternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import CalendarConfigBuilder from '../../stateful/config/calendar-config.builder'
import { PluginBase } from '@schedule-x/shared/src'
import { translations } from '@schedule-x/translations/src'

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
    .withMinDate(config.minDate ? config.minDate.toString() : undefined)
    .withMaxDate(config.maxDate ? config.maxDate.toString() : undefined)
    .withMonthGridOptions(config.monthGridOptions)
    .withBackgroundEvents(config.backgroundEvents)
    .withTheme(config.theme)
    .withTranslations(config.translations || translations)
    .withWeekNumbers(config.showWeekNumbers)
    .withTimezone(config.timezone)
    .withResources(config.resources)
    .withResourceGridOptions(config.resourceGridOptions)
    .build()
}

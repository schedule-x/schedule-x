import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

export const createTimeUnitsImpl = (internalConfig: CalendarConfigInternal) => {
  return new TimeUnitsBuilder()
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .build()
}

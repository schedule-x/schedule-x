import TimeUnitsBuilder from '../../../../../shared/src/utils/stateful/time-units/time-units.builder'
import CalendarConfigInternal from '../../stateful/config/calendar-config'

export const createTimeUnitsImpl = (internalConfig: CalendarConfigInternal) => {
  return new TimeUnitsBuilder()
    .withFirstDayOfWeek(internalConfig.firstDayOfWeek)
    .build()
}

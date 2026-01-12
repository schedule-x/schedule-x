import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'

const getRangeStartGivenDayBoundaries = (
  calendarConfig: CalendarConfigInternal,
  date: Temporal.ZonedDateTime
): Temporal.ZonedDateTime => {
  const timeString = timeStringFromTimePoints(
    calendarConfig.dayBoundaries.value.start
  )

  return Temporal.ZonedDateTime.from({
    year: date.year,
    month: date.month,
    day: date.day,
    hour: +timeString.split(':')[0],
    minute: +timeString.split(':')[1],
    timeZone: calendarConfig.timezone.value,
  })
}

const getRangeEndGivenDayBoundaries = (
  calendarConfig: CalendarConfigInternal,
  date: Temporal.ZonedDateTime
): Temporal.ZonedDateTime => {
  let dayEndTimeString = timeStringFromTimePoints(
    calendarConfig.dayBoundaries.value.end
  )
  let newRangeEndDate = date
  if (calendarConfig.isHybridDay) {
    newRangeEndDate = addDays(newRangeEndDate, 1) as Temporal.ZonedDateTime
  }
  if (calendarConfig.dayBoundaries.value.end === 2400) {
    dayEndTimeString = '23:59'
  }

  return Temporal.ZonedDateTime.from({
    year: newRangeEndDate.year,
    month: newRangeEndDate.month,
    day: newRangeEndDate.day,
    hour: +dayEndTimeString.split(':')[0],
    minute: +dayEndTimeString.split(':')[1],
    timeZone: calendarConfig.timezone.value,
  })
}

export const setRangeForResourceView = (
  config: RangeSetterConfig
): DateRange => {
  const nDays = config.calendarConfig.resourceGridOptions.value.nDays
  const weekForDate = config.timeUnitsImpl
    .getWeekFor(config.date)
    .slice(0, nDays)

  return {
    start: getRangeStartGivenDayBoundaries(
      config.calendarConfig,
      weekForDate[0]
    ),
    end: getRangeEndGivenDayBoundaries(
      config.calendarConfig,
      weekForDate[weekForDate.length - 1]
    ),
  }
}

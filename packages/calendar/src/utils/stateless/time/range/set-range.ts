import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import {
  toIntegers,
  toJSDate,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'
import { DateRange } from '@schedule-x/shared/src/types/date-range'


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

export const setRangeForWeek = (config: RangeSetterConfig): DateRange => {
  const weekForDate = config.timeUnitsImpl
    .getWeekFor(config.date)
    .slice(0, config.calendarConfig.weekOptions.value.nDays)

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

export const setRangeForMonth = (config: RangeSetterConfig): DateRange => {
  const monthForDate = config.timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    config.date.year,
    config.date.month
  )
  const newRangeEndDate = toDateString(
    monthForDate[monthForDate.length - 1][
      monthForDate[monthForDate.length - 1].length - 1
    ]
  )
  return {
    start: monthForDate[0][0],
    end: monthForDate[monthForDate.length - 1][
      monthForDate[monthForDate.length - 1].length - 1
    ],
  }
}

export const setRangeForDay = (config: RangeSetterConfig): DateRange => {
  let date = config.date as Temporal.ZonedDateTime | Temporal.PlainDate
  if (date instanceof Temporal.PlainDate) {
    date = date.toZonedDateTime({ timeZone: config.calendarConfig.timezone.value })
  }
  return {
    start: getRangeStartGivenDayBoundaries(
      config.calendarConfig,
      date
    ),
    end: getRangeEndGivenDayBoundaries(
      config.calendarConfig,
      date
    ),
  }
}

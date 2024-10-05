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
  date: Date
) => {
  return `${toDateString(date)} ${timeStringFromTimePoints(
    calendarConfig.dayBoundaries.value.start
  )}`
}

const getRangeEndGivenDayBoundaries = (
  calendarConfig: CalendarConfigInternal,
  date: Date
) => {
  let dayEndTimeString = timeStringFromTimePoints(
    calendarConfig.dayBoundaries.value.end
  )
  let newRangeEndDate = toDateString(date)
  if (calendarConfig.isHybridDay) {
    newRangeEndDate = addDays(newRangeEndDate, 1)
  }
  if (calendarConfig.dayBoundaries.value.end === 2400) {
    dayEndTimeString = '23:59'
  }
  return `${newRangeEndDate} ${dayEndTimeString}`
}

export const setRangeForWeek = (config: RangeSetterConfig): DateRange => {
  const weekForDate = config.timeUnitsImpl
    .getWeekFor(toJSDate(config.date))
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
  const { year, month } = toIntegers(config.date)
  const monthForDate = config.timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    year,
    month
  )
  const newRangeEndDate = toDateString(
    monthForDate[monthForDate.length - 1][
      monthForDate[monthForDate.length - 1].length - 1
    ]
  )
  return {
    start: toDateTimeString(monthForDate[0][0]),
    end: `${newRangeEndDate} 23:59`,
  }
}

export const setRangeForDay = (config: RangeSetterConfig): DateRange => {
  return {
    start: getRangeStartGivenDayBoundaries(
      config.calendarConfig,
      toJSDate(config.date)
    ),
    end: getRangeEndGivenDayBoundaries(
      config.calendarConfig,
      toJSDate(config.date)
    ),
  }
}

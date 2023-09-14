import TimeUnits from '../../../../../../../shared/utils/stateful/time-units/time-units.interface'
import CalendarConfigInternal from '../../../stateful/config/calendar-config'
import { Signal } from '@preact/signals'
import { DateRange } from '../../../../types/date-range'
import {
  toIntegers,
  toJSDate,
} from '../../../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { timeStringFromTimePoints } from '../time-points/string-conversion'
import {
  toDateString,
  toDateTimeString,
} from '../../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { addDays } from '../../../../../../../shared/utils/stateless/time/date-time-mutation/adding'

const getRangeStartGivenDayBoundaries = (
  calendarConfig: CalendarConfigInternal,
  date: Date
) => {
  return `${toDateString(date)} ${timeStringFromTimePoints(
    calendarConfig.dayBoundaries.start
  )}`
}

const getRangeEndGivenDayBoundaries = (
  calendarConfig: CalendarConfigInternal,
  date: Date
) => {
  let dayEndTimeString = timeStringFromTimePoints(
    calendarConfig.dayBoundaries.end
  )
  let newRangeEndDate = toDateString(date)
  if (calendarConfig.isHybridDay) {
    newRangeEndDate = addDays(newRangeEndDate, 1)
  }
  if (calendarConfig.dayBoundaries.end === 2400) {
    dayEndTimeString = '23:59'
  }
  return `${newRangeEndDate} ${dayEndTimeString}`
}

export const setRangeForWeek = (
  date: string,
  timeUnitsImpl: TimeUnits,
  calendarConfig: CalendarConfigInternal,
  range: Signal<DateRange | null>
) => {
  const weekForDate = timeUnitsImpl.getWeekFor(toJSDate(date))

  range.value = {
    start: getRangeStartGivenDayBoundaries(calendarConfig, weekForDate[0]),
    end: getRangeEndGivenDayBoundaries(
      calendarConfig,
      weekForDate[weekForDate.length - 1]
    ),
  }
}

export const setRangeForMonth = (
  date: string,
  timeUnitsImpl: TimeUnits,
  range: Signal<DateRange | null>
) => {
  const { year, month } = toIntegers(date)
  const monthForDate = timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
    year,
    month
  )
  const newRangeEndDate = toDateString(
    monthForDate[monthForDate.length - 1][
      monthForDate[monthForDate.length - 1].length - 1
    ]
  )
  range.value = {
    start: toDateTimeString(monthForDate[0][0]),
    end: `${newRangeEndDate} 23:59`,
  }
}

export const setRangeForDay = (
  date: string,
  calendarConfig: CalendarConfigInternal,
  range: Signal<DateRange | null>
) => {
  range.value = {
    start: getRangeStartGivenDayBoundaries(calendarConfig, toJSDate(date)),
    end: getRangeEndGivenDayBoundaries(calendarConfig, toJSDate(date)),
  }
}

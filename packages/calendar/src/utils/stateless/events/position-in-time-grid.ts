import { Week } from '../../../types/week'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { Temporal } from 'temporal-polyfill'
import { CLIENT_RENEG_LIMIT } from 'tls'

export const positionInTimeGrid = (
  timeGridEvents: CalendarEventInternal[],
  week: Week,
  $app: CalendarAppSingleton
) => {
  for (const event of timeGridEvents) {
    const range = $app.calendarState.range.value as DateRange

    if (event.start.toString() >= range.start.toString() && event.end.toString() <= range.end.toString()) {
      let date = dateFromDateTime(event.start.toString())

      if ($app.config.isHybridDay) {
        const { year, month, date: day } = toIntegers(date)
        const previousDayStart = `${addDays(Temporal.PlainDate.from({ year, month, day }), -1)} ${timeStringFromTimePoints($app.config.dayBoundaries.value.start)}`
        const previousDayEnd = `${date} ${timeStringFromTimePoints($app.config.dayBoundaries.value.end)}`
        const actualDayStart = `${date} ${timeStringFromTimePoints($app.config.dayBoundaries.value.start)}`

        if (
          event.start.toString() > previousDayStart &&
          event.start.toString() < previousDayEnd &&
          event.start.toString() < actualDayStart
        ) {
          const { year, month, date: day } = toIntegers(date)
          date = dateFromDateTime(addDays(Temporal.PlainDate.from({ year, month, day }), -1).toString())
        }
      }
      week[date]?.timeGridEvents.push(event)
    }
  }

  return week
}

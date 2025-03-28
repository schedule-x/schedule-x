import { Week } from '../../../types/week'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

export const positionInTimeGrid = (
  timeGridEvents: CalendarEventInternal[],
  week: Week,
  $app: CalendarAppSingleton
) => {
  for (const event of timeGridEvents) {
    const range = $app.calendarState.range.value as DateRange

    if (event.start >= range.start && event.end <= range.end) {
      let date = dateFromDateTime(event.start)

      if ($app.config.isHybridDay) {
        const previousDayStart = `${addDays(date, -1)} ${timeStringFromTimePoints($app.config.dayBoundaries.value.start)}`
        const previousDayEnd = `${date} ${timeStringFromTimePoints($app.config.dayBoundaries.value.end)}`
        const actualDayStart = `${date} ${timeStringFromTimePoints($app.config.dayBoundaries.value.start)}`

        if (
          event.start > previousDayStart &&
          event.start < previousDayEnd &&
          event.start < actualDayStart
        ) {
          date = addDays(date, -1)
        }
      }
      week[date]?.timeGridEvents.push(event)
    }
  }

  return week
}

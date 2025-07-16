import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { Temporal } from 'temporal-polyfill'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export const filterByRange = (
  events: BackgroundEvent[],
  range: DateRange,
  timezone: IANATimezone
): BackgroundEvent[] => {
  return events.filter((event) => {
    let rangeStart = range.start
    let rangeEnd = range.end

    let eventStart = event.start
    let eventEnd = event.end
    
    // Convert PlainDate to ZonedDateTime with start time 00:00:00
    if (eventStart instanceof Temporal.PlainDate) {
      eventStart = eventStart.toZonedDateTime(timezone)
    }
    
    // Convert PlainDate to ZonedDateTime with end time 23:59:59
    if (eventEnd instanceof Temporal.PlainDate) {
      eventEnd = eventEnd.toZonedDateTime(timezone).with({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999,
        microsecond: 999,
        nanosecond: 999
      })
    }

    const eventStartsInRange =
      eventStart.toString() >= rangeStart.toString() && eventStart.toString() <= rangeEnd.toString()
    const eventEndInRange = eventEnd.toString() >= rangeStart.toString() && eventEnd.toString() <= rangeEnd.toString()
    const eventStartBeforeAndEventEndAfterRange =
      eventStart.toString() < rangeStart.toString() && eventEnd.toString() > rangeEnd.toString()

    return (
      eventStartsInRange ||
      eventEndInRange ||
      eventStartBeforeAndEventEndAfterRange
    )
  })
}

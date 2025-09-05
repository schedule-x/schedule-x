import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'

export const filterByRange = (
  events: BackgroundEvent[],
  range: DateRange,
  timezone: IANATimezone
): BackgroundEvent[] => {
  return events.filter((event) => {
    const rangeStart = range.start
    const rangeEnd = range.end

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
        nanosecond: 999,
      })
    }

    const eventStartsInRange =
      eventStart.epochNanoseconds >= rangeStart.epochNanoseconds &&
      eventStart.epochNanoseconds <= rangeEnd.epochNanoseconds
    const eventEndInRange =
      eventEnd.epochNanoseconds >= rangeStart.epochNanoseconds &&
      eventEnd.epochNanoseconds <= rangeEnd.epochNanoseconds
    const eventStartBeforeAndEventEndAfterRange =
      eventStart.epochNanoseconds < rangeStart.epochNanoseconds &&
      eventEnd.epochNanoseconds > rangeEnd.epochNanoseconds

    return (
      eventStartsInRange ||
      eventEndInRange ||
      eventStartBeforeAndEventEndAfterRange
    )
  })
}

import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { dateStringRegex } from '@schedule-x/shared/src'

export const filterByRange = (
  events: BackgroundEvent[],
  range: DateRange
): BackgroundEvent[] => {
  return events.filter((event) => {
    let rangeStart = range.start
    let rangeEnd = range.end
    if (dateStringRegex.test(rangeStart)) rangeStart = rangeStart + ' 00:00'
    if (dateStringRegex.test(rangeEnd)) rangeEnd = rangeEnd + ' 23:59'

    let eventStart = event.start
    let eventEnd = event.end
    if (dateStringRegex.test(eventStart)) eventStart = eventStart + ' 00:00'
    if (dateStringRegex.test(eventEnd)) eventEnd = eventEnd + ' 23:59'

    const eventStartsInRange =
      eventStart >= rangeStart && eventStart <= rangeEnd
    const eventEndInRange = eventEnd >= rangeStart && eventEnd <= rangeEnd
    const eventStartBeforeAndEventEndAfterRange =
      eventStart < rangeStart && eventEnd > rangeEnd

    return (
      eventStartsInRange ||
      eventEndInRange ||
      eventStartBeforeAndEventEndAfterRange
    )
  })
}

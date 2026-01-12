import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { Resource } from '@schedule-x/shared/src/types/calendar/resource'
import { useContext, useMemo } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import ResourceTimeGridEvent from './resource-time-grid-event'
import { sortEventsByStartAndEnd } from '../utils/stateless/sort-events-by-start-and-end'
import { handleEventConcurrency } from '../utils/stateless/event-concurrency'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

type props = {
  calendarEvents: CalendarEventInternal[]
  date: Temporal.ZonedDateTime
  resource: Resource
}

export default function ResourceTimeGridDay({
  calendarEvents,
  date,
  resource,
}: props) {
  const $app = useContext(AppContext)

  const timeStringFromDayBoundary = timeStringFromTimePoints(
    $app.config.dayBoundaries.value.start
  )
  const timeStringFromDayBoundaryEnd = timeStringFromTimePoints(
    $app.config.dayBoundaries.value.end
  )
  const dayStartDateTime = date.with({
    hour: +timeStringFromDayBoundary.split(':')[0],
    minute: +timeStringFromDayBoundary.split(':')[1],
  })
  const endHour = +timeStringFromDayBoundaryEnd.split(':')[0]
  const endWithAdjustedTime = date.with({
    hour: endHour === 24 ? 23 : endHour,
    minute: endHour === 24 ? 59 : +timeStringFromDayBoundaryEnd.split(':')[1],
    second: endHour === 24 ? 59 : 0,
  })
  const dayEndDateTime = $app.config.isHybridDay
    ? (addDays(endWithAdjustedTime, 1) as Temporal.ZonedDateTime)
    : endWithAdjustedTime

  const dayBoundariesDateTime: DayBoundariesDateTime = {
    start: dayStartDateTime,
    end: dayEndDateTime,
  }

  const eventsWithConcurrency = useMemo(() => {
    const sortedEvents = calendarEvents.sort(sortEventsByStartAndEnd)
    return handleEventConcurrency(sortedEvents)
  }, [calendarEvents])

  const handleOnClick = (e: MouseEvent) => {
    const callback = $app.config.callbacks.onClickDateTime
    if (!callback) return
    // For now, just use the day start as a placeholder
    callback(dayStartDateTime, e)
  }

  return (
    <div
      className="sx__resource-time-grid-day sx__time-grid-day"
      data-time-grid-date={toDateString(date)}
      data-resource-id={resource.id}
      onClick={handleOnClick}
      aria-label={`${resource.name} - ${getLocalizedDate(date, $app.config.locale.value)}`}
    >
      {eventsWithConcurrency.map((event) => (
        <ResourceTimeGridEvent
          key={event.id}
          calendarEvent={event}
          dayBoundariesDateTime={dayBoundariesDateTime}
        />
      ))}
    </div>
  )
}

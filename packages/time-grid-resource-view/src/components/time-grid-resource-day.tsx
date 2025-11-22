import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useState, useMemo } from 'preact/hooks'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { sortEventsByStartAndEnd } from '../utils/sort-by-start-date'
import { handleEventConcurrency } from '../utils/event-concurrency'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getClickDateTime } from '../utils/grid-click-to-datetime'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import TimeGridResourceEvent from './time-grid-resource-event'

type props = {
  calendarEvents: CalendarEventInternal[]
  backgroundEvents: BackgroundEvent[]
  date: Temporal.ZonedDateTime
  $app: CalendarAppSingleton
}

export default function TimeGridResourceDay({
  calendarEvents,
  date,
  backgroundEvents,
  $app,
}: props) {
  const [mouseDownOnChild, setMouseDownOnChild] = useState<boolean>(false)

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

  // Apply concurrency algorithm per resource column
  const eventsWithConcurrency = useMemo(() => {
    const sortedEvents = calendarEvents.sort(sortEventsByStartAndEnd)
    return handleEventConcurrency(sortedEvents)
  }, [calendarEvents])

  const handleOnClick = (
    e: MouseEvent,
    callback:
      | ((dateTime: Temporal.ZonedDateTime, e?: UIEvent) => void)
      | undefined
  ) => {
    if (!callback || mouseDownOnChild) return

    const clickDateTime = getClickDateTime(e, $app, dayStartDateTime)
    if (clickDateTime) {
      callback(clickDateTime, e)
    }
  }

  const handleMouseDown = (e: MouseEvent) => {
    const callback = $app.config.callbacks.onMouseDownDateTime
    if (!callback || mouseDownOnChild) return

    const clickDateTime = getClickDateTime(e, $app, dayStartDateTime)
    if (clickDateTime) {
      callback(clickDateTime, e)
    }
  }

  const handlePointerUp = () => {
    const msWaitToEnsureThatClickEventWasDispatched = 10
    setTimeout(() => {
      setMouseDownOnChild(false)
    }, msWaitToEnsureThatClickEventWasDispatched)
  }

  return (
    <div
      className="sx__time-grid-day"
      style={{ width: '100%', height: '100%' }}
      onClick={(e) => handleOnClick(e, $app.config.callbacks.onClickDateTime)}
      onMouseDown={handleMouseDown}
      onPointerUp={handlePointerUp}
    >
      {eventsWithConcurrency.map((calendarEvent) => (
        <TimeGridResourceEvent
          key={calendarEvent.id}
          calendarEvent={calendarEvent}
          dayBoundariesDateTime={dayBoundariesDateTime}
          setMouseDown={setMouseDownOnChild}
          $app={$app}
        />
      ))}
    </div>
  )
}

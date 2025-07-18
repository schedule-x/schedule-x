import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useState, useMemo } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import TimeGridEvent from './time-grid-event'
import { sortEventsByStartAndEnd } from '../../utils/stateless/events/sort-by-start-date'
import { handleEventConcurrency } from '../../utils/stateless/events/event-concurrency'
import { timeStringFromTimePoints } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { setTimeInDateTimeString } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getClickDateTime } from '../../utils/stateless/time/grid-click-to-datetime/grid-click-to-datetime'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { getClassNameForWeekday } from '../../utils/stateless/get-class-name-for-weekday'
import { toJSDate } from '@schedule-x/shared/src'
import TimeGridBackgroundEvent from './background-event'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { useComputed } from '@preact/signals'

type props = {
  calendarEvents: CalendarEventInternal[]
  backgroundEvents: BackgroundEvent[]
  date: string
}

export default function TimeGridDay({
  calendarEvents,
  date,
  backgroundEvents,
}: props) {
  /**
   * The time grid day needs to keep track of whether the mousedown event happened on a calendar event, in order to prevent
   * click events from firing when dragging an event.
   * */
  const [mouseDownOnChild, setMouseDownOnChild] = useState<boolean>(false)
  const $app = useContext(AppContext)

  const timeStringFromDayBoundary = timeStringFromTimePoints(
    $app.config.dayBoundaries.value.start
  )
  const timeStringFromDayBoundaryEnd = timeStringFromTimePoints(
    $app.config.dayBoundaries.value.end
  )
  const dayStartDateTime = setTimeInDateTimeString(
    date,
    timeStringFromDayBoundary
  )
  const dayEndDateTime = $app.config.isHybridDay
    ? addDays(setTimeInDateTimeString(date, timeStringFromDayBoundaryEnd), 1)
    : setTimeInDateTimeString(date, timeStringFromDayBoundaryEnd)

  const dayBoundariesDateTime: DayBoundariesDateTime = {
    start: dayStartDateTime,
    end: dayEndDateTime,
  }

  const eventsWithConcurrency = useMemo(() => {
    const sortedEvents = calendarEvents.sort(sortEventsByStartAndEnd)
    return handleEventConcurrency(sortedEvents)
  }, [calendarEvents])

  const handleOnClick = (
    e: MouseEvent,
    callback: ((dateTime: string, e?: UIEvent) => void) | undefined
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

  const baseClasses = [
    'sx__time-grid-day',
    getClassNameForWeekday(toJSDate(date).getDay()),
  ]

  const classNames = useComputed(() => {
    const newClassNames = [...baseClasses]
    if ($app.datePickerState.selectedDate.value === date)
      newClassNames.push('is-selected')
    return newClassNames
  })

  return (
    <div
      className={classNames.value.join(' ')}
      data-time-grid-date={date}
      onClick={(e) => handleOnClick(e, $app.config.callbacks.onClickDateTime)}
      onDblClick={(e) =>
        handleOnClick(e, $app.config.callbacks.onDoubleClickDateTime)
      }
      aria-label={getLocalizedDate(date, $app.config.locale.value)}
      onMouseLeave={() => setMouseDownOnChild(false)}
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      onMouseDown={handleMouseDown}
    >
      {backgroundEvents.map((event) => (
        <>
          <TimeGridBackgroundEvent backgroundEvent={event} date={date} />
        </>
      ))}

      {eventsWithConcurrency.map((event) => (
        <TimeGridEvent
          key={event.id}
          calendarEvent={event}
          dayBoundariesDateTime={dayBoundariesDateTime}
          setMouseDown={setMouseDownOnChild}
        />
      ))}
    </div>
  )
}

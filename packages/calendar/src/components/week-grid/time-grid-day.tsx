/* eslint-disable max-lines */
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useEffect, useState } from 'preact/hooks'
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
import { useSignalEffect } from '@preact/signals'
import TimeGridBackgroundEvent from './background-event'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'
import { randomStringId } from '@schedule-x/shared/src'

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
  const dayElementId = useState(randomStringId())[0]
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

  const sortedEvents = calendarEvents.sort(sortEventsByStartAndEnd)
  const [eventsWithConcurrency, setEventsWithConcurrency] = useState<
    CalendarEventInternal[]
  >([])

  useEffect(() => {
    setEventsWithConcurrency(handleEventConcurrency(sortedEvents))
  }, [calendarEvents])

  const handleOnClick = (
    e: MouseEvent,
    callback: ((dateTime: string) => void) | undefined
  ) => {
    if (!callback || mouseDownOnChild) return

    const clickDateTime = getClickDateTime(e, $app, dayStartDateTime)
    if (clickDateTime) {
      callback(clickDateTime)
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
  const [classNames, setClassNames] = useState<string[]>(baseClasses)

  useSignalEffect(() => {
    const newClassNames = [...baseClasses]
    if ($app.datePickerState.selectedDate.value === date)
      newClassNames.push('is-selected')
    setClassNames(newClassNames)
  })

  const [eventsHiddenAtTop, setEventsHiddenAtTop] = useState<HTMLElement[]>([])
  const [eventsHiddenAtBottom, setEventsHiddenAtBottom] = useState<
    HTMLElement[]
  >([])
  const [viewContainer] = useState(() =>
    $app.elements.calendarWrapper?.querySelector('.sx__view-container')
  )
  const [weekHeaderHeight] = useState(
    () =>
      $app.elements.calendarWrapper?.querySelector('.sx__week-header')
        ?.clientHeight || 0
  )
  const [viewContainerScrollTop, setViewContainerScrollTop] = useState(0)

  useEffect(() => {
    if (!(viewContainer instanceof HTMLElement)) return

    const listener = () => {
      setViewContainerScrollTop(viewContainer.scrollTop)
      const newEventsHiddenAtTop: HTMLElement[] = []
      const newEventsHiddenAtBottom: HTMLElement[] = []

      const dayElement = document.getElementById(dayElementId)
      if (!(dayElement instanceof HTMLElement)) return

      const viewContainerRect = viewContainer.getBoundingClientRect()

      const allEventElements = dayElement.querySelectorAll(
        '.sx__time-grid-event'
      )
      allEventElements.forEach((eventEl) => {
        if (!(eventEl instanceof HTMLElement)) return

        const eventRect = eventEl.getBoundingClientRect()
        const weekGridTop = viewContainerRect.top + weekHeaderHeight

        if (eventRect.bottom < weekGridTop) {
          console.log('hidden at the top')
          newEventsHiddenAtTop.push(eventEl)
        } else if (eventRect.top > viewContainerRect.bottom) {
          console.log('hidden at the bottom')
          newEventsHiddenAtBottom.push(eventEl)
        } else {
          console.log('visible')
        }
      })
      setEventsHiddenAtTop(newEventsHiddenAtTop)
      setEventsHiddenAtBottom(newEventsHiddenAtBottom)
    }
    viewContainer.addEventListener('scroll', listener)

    return () => {
      viewContainer.removeEventListener('scroll', listener)
    }
  }, [])

  return (
    <div
      id={dayElementId}
      className={classNames.join(' ')}
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
      {viewContainer && !!eventsHiddenAtTop.length && (
        <div
          className={'sx__time-grid-day__hidden-events-top-indicator'}
          style={{
            top: `${viewContainerScrollTop}px`,
          }}
        >
          + {eventsHiddenAtTop.length} more
        </div>
      )}
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

      {viewContainer && !!eventsHiddenAtBottom.length && (
        <div
          className={'sx__time-grid-day__hidden-events-bottom-indicator'}
          style={{
            top: `${viewContainer.clientHeight + viewContainerScrollTop}px`,
          }}
        >
          + {eventsHiddenAtBottom.length} hidden at the bottom
        </div>
      )}
    </div>
  )
}

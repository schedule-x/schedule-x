/* eslint-disable max-lines */
import { AppContext } from '../../../utils/stateful/app-context'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { scrollOnDateSelection } from '../utils/stateless/scroll-on-date-selection'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import {
  expandInfiniteRecurringEventsIfNeeded,
  checkAndExpandInfiniteRecurringEvents,
} from '../utils/stateless/expand-infinite-recurring-events'
import ListEvent from './list-event'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

interface DayWithEvents {
  date: string
  events: CalendarEventInternal[]
}

interface ListWrapperProps {
  $app: CalendarAppSingleton
  id: string
  onScrollDayIntoView?: (date: string) => void
}

export const ListWrapper: PreactViewComponent = ({
  $app,
  id,
}: ListWrapperProps) => {
  const [daysWithEvents, setDaysWithEvents] = useState<DayWithEvents[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  /**
   * "hack" for preventing the onScrollDayIntoView callback from being called just after events have changed
   * any ideas for how to improve this are welcome
   * */
  const blockOnScrollDayIntoViewCallback = useRef(false)
  const blockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastRangeExpansionRef = useRef<string | null>(null)
  const isExpandingRangeRef = useRef(false)
  const scrollPositionBeforeExpansionRef = useRef<number | null>(null)

  const minDate = $app.config.minDate.value
    ? dateFromDateTime($app.config.minDate.value.toString())
    : null
  const maxDate = $app.config.maxDate.value
    ? dateFromDateTime($app.config.maxDate.value.toString())
    : null

  const updateDaysWithEvents = (events: CalendarEventInternal[]) => {
    const daysWithEventsMap = events.reduce(
      (
        acc: Record<string, CalendarEventInternal[]>,
        event: CalendarEventInternal
      ) => {
        const startDate = dateFromDateTime(event.start.toString())
        const endDate = dateFromDateTime(event.end.toString())
        let currentDate = startDate

        while (currentDate <= endDate) {
          if (!acc[currentDate]) {
            acc[currentDate] = []
          }
          acc[currentDate].push(event)
          currentDate = addDays(
            Temporal.PlainDate.from(currentDate),
            1
          ).toString()
        }

        return acc
      },
      {}
    )

    const sortedDays = Object.entries(daysWithEventsMap)
      .map(([date, events]) => ({
        date,
        events: events.sort((a, b) =>
          a.start.toString().localeCompare(b.start.toString())
        ),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    setDaysWithEvents(sortedDays)

    if (blockTimeoutRef.current) {
      clearTimeout(blockTimeoutRef.current)
    }

    blockTimeoutRef.current = setTimeout(() => {
      blockOnScrollDayIntoViewCallback.current = false
      blockTimeoutRef.current = null
    }, 100)
  }

  useEffect(() => {
    const filteredEvents = $app.calendarEvents.list.value.filter((event) => {
      const startDate = dateFromDateTime(event.start.toString())
      const endDate = dateFromDateTime(event.end.toString())
      if (minDate && endDate < minDate) return false
      if (maxDate && startDate > maxDate) return false
      return true
    })

    /**
     * onScrollDayIntoView can never be allowed to be called as a side effect of events changing.
     * Otherwise, implementers will have to write custom logic to prevent infinite recursion.
     *
     * Open to any ideas for how to improve this and make do without a timeout.
     * */
    blockOnScrollDayIntoViewCallback.current = true
    updateDaysWithEvents(filteredEvents)

    // After updating days, check if we need to expand infinite recurring events
    // This handles the case where the user is already at the bottom
    nextTick(() => {
      expandInfiniteRecurringEventsIfNeeded({
        $app,
        wrapperRef,
        filteredEvents,
        lastRangeExpansionRef,
        isExpandingRangeRef,
        scrollPositionBeforeExpansionRef,
      })
    })
  }, [$app.calendarEvents.list.value])

  useEffect(() => {
    const handleScroll = () => {
      if (blockTimeoutRef.current) {
        clearTimeout(blockTimeoutRef.current)
        blockTimeoutRef.current = null
        blockOnScrollDayIntoViewCallback.current = false
      }
    }

    const wrapper = wrapperRef.current
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll)
      return () => {
        wrapper.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const [interSectionObserver, setIntersectionObserver] =
    useState<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    // Disconnect existing observer to set up a new one with updated elements
    if (interSectionObserver) {
      interSectionObserver.disconnect()
    }

    const _observer = new IntersectionObserver(
      (entries) => {
        // Track which days are currently visible
        const visibleDates = new Set<string>()

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const date = entry.target.getAttribute('data-date')
            if (date) {
              visibleDates.add(date)
            }
          }
        })

        // Call onScrollDayIntoView callback if provided
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const date = entry.target.getAttribute('data-date')
            if (
              date &&
              $app.config.callbacks.onScrollDayIntoView &&
              !blockOnScrollDayIntoViewCallback.current
            ) {
              $app.config.callbacks.onScrollDayIntoView(
                Temporal.PlainDate.from(date)
              )
            }
          }
        })

        // If we have infinite recurring events, check if we need to expand
        if (visibleDates.size > 0 && daysWithEvents.length > 0) {
          checkAndExpandInfiniteRecurringEvents({
            $app,
            wrapperRef,
            filteredEvents: $app.calendarEvents.list.value.filter((event) => {
              const startDate = dateFromDateTime(event.start.toString())
              const endDate = dateFromDateTime(event.end.toString())
              if (minDate && endDate < minDate) return false
              if (maxDate && startDate > maxDate) return false
              return true
            }),
            visibleDates,
            lastRangeExpansionRef,
            isExpandingRangeRef,
            scrollPositionBeforeExpansionRef,
          })
        }
      },
      {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: [0, 0.1, 1.0],
      }
    )

    const dayElements = wrapperRef.current.querySelectorAll('.sx__list-day')
    dayElements.forEach((dayElement) => {
      _observer.observe(dayElement)
    })

    setIntersectionObserver(_observer)

    return () => {
      _observer.disconnect()
    }
  }, [daysWithEvents])

  useEffect(() => {
    // If we're expanding the range for infinite recurring events, restore scroll position
    // instead of scrolling to selected date
    if (
      isExpandingRangeRef.current &&
      scrollPositionBeforeExpansionRef.current !== null
    ) {
      nextTick(() => {
        if (
          wrapperRef.current &&
          scrollPositionBeforeExpansionRef.current !== null
        ) {
          wrapperRef.current.scrollTop =
            scrollPositionBeforeExpansionRef.current
          scrollPositionBeforeExpansionRef.current = null
          isExpandingRangeRef.current = false
        }
      })
    } else {
      scrollOnDateSelection($app, wrapperRef)
    }
  }, [daysWithEvents, $app.datePickerState.selectedDate.value])

  const renderEventTimes = (event: CalendarEventInternal, dayDate: string) => {
    const eventStartDate = dateFromDateTime(event.start.toString())
    const eventEndDate = dateFromDateTime(event.end.toString())
    const isFirstDay = eventStartDate === dayDate
    const isLastDay = eventEndDate === dayDate
    const isMultiDay = eventStartDate !== eventEndDate

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: $app.config.locale.value === 'en-US',
    } as const

    const startZDT = Temporal.ZonedDateTime.from({
      year: event.start.year,
      month: event.start.month,
      day: event.start.day,
      hour:
        event.start instanceof Temporal.ZonedDateTime ? event.start.hour : 0,
      minute:
        event.start instanceof Temporal.ZonedDateTime ? event.start.minute : 0,
      timeZone: $app.config.timezone.value,
    })

    const endZDT = Temporal.ZonedDateTime.from({
      year: event.end.year,
      month: event.end.month,
      day: event.end.day,
      hour: event.end instanceof Temporal.ZonedDateTime ? event.end.hour : 0,
      minute:
        event.end instanceof Temporal.ZonedDateTime ? event.end.minute : 0,
      timeZone: $app.config.timezone.value,
    })

    if (!isMultiDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {startZDT.toLocaleString($app.config.locale.value, timeOptions)}
          </div>
          {event.end && (
            <div className="sx__list-event-end-time">
              {endZDT.toLocaleString($app.config.locale.value, timeOptions)}
            </div>
          )}
        </>
      )
    }

    if (isFirstDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {startZDT.toLocaleString($app.config.locale.value, timeOptions)}
          </div>
          <div className="sx__list-event-arrow">→</div>
        </>
      )
    }

    if (isLastDay) {
      return (
        <>
          <div className="sx__list-event-arrow">←</div>
          <div className="sx__list-event-end-time">
            {endZDT.toLocaleString($app.config.locale.value, timeOptions)}
          </div>
        </>
      )
    }

    return <div className="sx__list-event-arrow">↔</div>
  }

  const listDayHeaderCustomComponent =
    $app.config._customComponentFns.listDayHeader
  const listNoEventsCustomComponent =
    $app.config._customComponentFns.listNoEvents

  const noEventsCCID = useState(
    listNoEventsCustomComponent ? randomStringId() : ''
  )[0]
  useEffect(() => {
    if (!listNoEventsCustomComponent || daysWithEvents.length > 0) return

    const el = document.querySelector(`[data-ccid="${noEventsCCID}"]`)
    if (!(el instanceof HTMLElement)) return

    listNoEventsCustomComponent(el, {})

    return () => {
      $app.config._destroyCustomComponentInstance?.(noEventsCCID)
    }
  }, [daysWithEvents])

  const dayHeaderCCIDs = useMemo(
    () =>
      daysWithEvents.map(() =>
        listDayHeaderCustomComponent ? randomStringId() : ''
      ),
    [daysWithEvents]
  )

  useEffect(() => {
    if (!listDayHeaderCustomComponent) return

    daysWithEvents.forEach((day, idx) => {
      const ccid = dayHeaderCCIDs[idx]
      if (!ccid) return

      const el = document.querySelector(`[data-ccid="${ccid}"]`)
      if (!(el instanceof HTMLElement)) return

      listDayHeaderCustomComponent(el, {
        date: day.date,
        jsDate: toJSDate(day.date),
      })
    })

    return () => {
      dayHeaderCCIDs.forEach((ccid) => {
        if (ccid) {
          $app.config._destroyCustomComponentInstance?.(ccid)
        }
      })
    }
  }, [daysWithEvents])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__list-wrapper" ref={wrapperRef}>
        {daysWithEvents.length === 0 ? (
          listNoEventsCustomComponent ? (
            <div className="sx__list-no-events" data-ccid={noEventsCCID} />
          ) : (
            <div className="sx__list-no-events">
              {$app.translate('No events')}
            </div>
          )
        ) : (
          daysWithEvents.map((day, dayIndex) => (
            <div key={day.date} className="sx__list-day" data-date={day.date}>
              {listDayHeaderCustomComponent ? (
                <div
                  className="sx__list-day-header"
                  data-ccid={dayHeaderCCIDs[dayIndex]}
                />
              ) : (
                <div className="sx__list-day-header">
                  <div className="sx__list-day-date">
                    {toJSDate(day.date).toLocaleDateString(
                      $app.config.locale.value,
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </div>
                </div>
              )}
              <div className="sx__list-day-events">
                {day.events.map((event) => (
                  <ListEvent
                    key={event.id}
                    calendarEvent={event}
                    dayDate={day.date}
                    renderEventTimes={renderEventTimes}
                  />
                ))}
              </div>
              <div className="sx__list-day-margin" />
            </div>
          ))
        )}
      </div>
    </AppContext.Provider>
  )
}

/* eslint-disable max-lines */
import { AppContext } from '../../../utils/stateful/app-context'
import { useEffect, useRef, useState } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { scrollOnDateSelection } from '../utils/stateless/scroll-on-date-selection'
import useEventInteractions from '../../../utils/stateful/hooks/use-event-interactions'
import { invokeOnEventClickCallback } from '../../../utils/stateless/events/invoke-on-event-click-callback'
import { invokeOnEventDoubleClickCallback } from '../../../utils/stateless/events/invoke-on-event-double-click-callback'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '../../../utils/stateless/events/focus-modal'
import {
  checkAndExpandInfiniteRecurringEvents,
  expandInfiniteRecurringEventsIfNeeded,
} from '../utils/stateless/expand-infinite-recurring-events'
import ListEvent from './list-event'
import { randomStringId } from '@schedule-x/shared/src'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'

export interface EventInstanceInfo {
  isFirstDay: boolean
  isLastDay: boolean
  isMultiDay: boolean
  startLocaleString: string
  endLocaleString?: string
  forDayOf: string
}

interface DayWithEvents {
  date: string
  events: CalendarEventInternal[]
}

interface ListWrapperProps {
  $app: CalendarAppSingleton
  id: string
  onScrollDayIntoView?: (date: string) => void
}

const getEventInstanceInfo = (
  event: CalendarEventInternal,
  forDayOf: string,
  locale: string,
  timeZone: string
): EventInstanceInfo => {
  const eventStartDate = dateFromDateTime(event.start.toString())
  const eventEndDate = dateFromDateTime(event.end.toString())
  const isFirstDay = eventStartDate === forDayOf
  const isLastDay = eventEndDate === forDayOf
  const isMultiDay = eventStartDate !== eventEndDate

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: locale === 'en-US',
  } as const

  const startZDT = Temporal.ZonedDateTime.from({
    year: event.start.year,
    month: event.start.month,
    day: event.start.day,
    hour: event.start instanceof Temporal.ZonedDateTime ? event.start.hour : 0,
    minute:
      event.start instanceof Temporal.ZonedDateTime ? event.start.minute : 0,
    timeZone,
  })

  const endZDT = Temporal.ZonedDateTime.from({
    year: event.end.year,
    month: event.end.month,
    day: event.end.day,
    hour: event.end instanceof Temporal.ZonedDateTime ? event.end.hour : 0,
    minute: event.end instanceof Temporal.ZonedDateTime ? event.end.minute : 0,
    timeZone,
  })

  const startLocaleString = startZDT.toLocaleString(locale, timeOptions)
  const endLocaleString = event.end
    ? endZDT.toLocaleString(locale, timeOptions)
    : undefined
  return {
    isFirstDay,
    isLastDay,
    isMultiDay,
    startLocaleString,
    endLocaleString,
    forDayOf,
  }
}

export const ListWrapper: PreactViewComponent = ({
  $app,
  id,
}: ListWrapperProps) => {
  const [daysWithEvents, setDaysWithEvents] = useState<DayWithEvents[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { setClickedEvent } = useEventInteractions($app)

  const listDayHeaderCustomComponentFn =
    $app.config._customComponentFns.listDayHeader
  const listNoEventsCustomComponentFn =
    $app.config._customComponentFns.listNoEvents
  const listNoEventsCCID = useRef(
    listNoEventsCustomComponentFn
      ? 'custom-list-no-events-' + randomStringId()
      : undefined
  )
  const dayHeaderCCIDsRef = useRef<Record<string, string>>({})

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

  const handleEventClick = (e: MouseEvent, event: CalendarEventInternal) => {
    setClickedEvent(e, event)
    invokeOnEventClickCallback($app, event, e)
  }

  const handleEventDoubleClick = (
    e: MouseEvent,
    event: CalendarEventInternal
  ) => {
    setClickedEvent(e, event)
    invokeOnEventDoubleClickCallback($app, event, e)
  }

  useEffect(() => {
    if (!listNoEventsCustomComponentFn || daysWithEvents.length > 0) return

    const el = getElementByCCID(listNoEventsCCID.current)
    if (!el) return

    listNoEventsCustomComponentFn(el, {
      $app,
    })

    return () => {
      $app.config._destroyCustomComponentInstance?.(
        listNoEventsCCID.current as string
      )
    }
  }, [daysWithEvents.length, listNoEventsCustomComponentFn])

  useEffect(() => {
    if (!listDayHeaderCustomComponentFn) return

    daysWithEvents.forEach((day) => {
      const ccid = dayHeaderCCIDsRef.current[day.date]
      if (!ccid) return

      const el = getElementByCCID(ccid)
      if (!el) return

      listDayHeaderCustomComponentFn(el, {
        date: day.date,
      })
    })

    return () => {
      Object.values(dayHeaderCCIDsRef.current).forEach((ccid) => {
        $app.config._destroyCustomComponentInstance?.(ccid)
      })
    }
  }, [daysWithEvents, listDayHeaderCustomComponentFn])

  const handleEventKeyDown = (
    e: KeyboardEvent,
    event: CalendarEventInternal
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      setClickedEvent(e, event)
      invokeOnEventClickCallback($app, event, e)
      nextTick(() => {
        focusModal($app)
      })
    }
  }
  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__list-wrapper" ref={wrapperRef}>
        {daysWithEvents.length === 0 ? (
          listNoEventsCustomComponentFn ? (
            <div data-ccid={listNoEventsCCID.current} />
          ) : (
            <div className="sx__list-no-events">
              {$app.translate('No events')}
            </div>
          )
        ) : (
          daysWithEvents.map((day) => {
            if (!dayHeaderCCIDsRef.current[day.date]) {
              dayHeaderCCIDsRef.current[day.date] =
                `custom-list-day-header-${randomStringId()}`
            }
            const dayHeaderCCID = dayHeaderCCIDsRef.current[day.date]

            return (
              <div key={day.date} className="sx__list-day" data-date={day.date}>
                {listDayHeaderCustomComponentFn ? (
                  <div data-ccid={dayHeaderCCID} />
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
                      eventInstanceInfo={getEventInstanceInfo(
                        event,
                        day.date,
                        $app.config.locale.value,
                        $app.config.timezone.value
                      )}
                      onEventClick={handleEventClick}
                      onEventDoubleClick={handleEventDoubleClick}
                      onEventKeyDown={handleEventKeyDown}
                    />
                  ))}
                </div>
                <div className="sx__list-day-margin" />
              </div>
            )
          })
        )}
      </div>
    </AppContext.Provider>
  )
}

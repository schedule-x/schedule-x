import { AppContext } from '../../../utils/stateful/app-context'
import { useEffect, useState, useRef, useCallback } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

interface DayWithEvents {
  date: string
  events: CalendarEventInternal[]
}

interface ListWrapperProps {
  $app: CalendarAppSingleton
  id: string
}

export const ListWrapper: PreactViewComponent = ({
  $app,
  id,
}: ListWrapperProps) => {
  const [daysWithEvents, setDaysWithEvents] = useState<DayWithEvents[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isLoadingMoreRef = useRef(false)
  const isLoadingEarlierRef = useRef(false)
  const hasInitialScrollRef = useRef(false)
  const hasInitialRangeRef = useRef(false)
  const isMountedRef = useRef(true)

  // Memoized function to update days with events
  const updateDaysWithEvents = useCallback((events: CalendarEventInternal[], range: { start: string; end: string }) => {
    if (!isMountedRef.current) return

    const daysWithEventsMap = events.reduce(
      (acc: Record<string, CalendarEventInternal[]>, event: CalendarEventInternal) => {
        const startDate = dateFromDateTime(event.start)
        const endDate = event.end ? dateFromDateTime(event.end) : startDate
        let currentDate = startDate

        while (currentDate <= endDate) {
          if (!acc[currentDate]) {
            acc[currentDate] = []
          }
          acc[currentDate].push(event)
          currentDate = addDays(currentDate, 1)
        }

        return acc
      },
      {}
    )

    const sortedDays = Object.entries(daysWithEventsMap)
      .map(([date, events]) => ({
        date,
        events: events.sort((a, b) => a.start.localeCompare(b.start)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const filteredDays = sortedDays.filter(
      (day) => day.date >= range.start && day.date <= range.end
    )

    setDaysWithEvents(filteredDays)
  }, [])

  // Initialize range with earliest and latest event dates only once
  useEffect(() => {
    const events = $app.calendarEvents.list.value
    if (events.length === 0 || hasInitialRangeRef.current) return

    const dates = events.flatMap(event => {
      const startDate = dateFromDateTime(event.start)
      const endDate = event.end ? dateFromDateTime(event.end) : startDate
      return [startDate, endDate]
    })

    const earliestDate = dates.reduce((earliest, current) => 
      current < earliest ? current : earliest
    )
    const latestDate = dates.reduce((latest, current) => 
      current > latest ? current : latest
    )

    $app.calendarState.range.value = {
      start: earliestDate,
      end: latestDate
    }
    hasInitialRangeRef.current = true
  }, [$app.calendarEvents.list.value])

  // Update days with events when events change
  useEffect(() => {
    const events = $app.calendarEvents.list.value
    const range = $app.calendarState.range.value
    if (!range) return

    updateDaysWithEvents(events, range)
  }, [$app.calendarEvents.list.value, $app.calendarState.range.value, updateDaysWithEvents])

  // Scroll to selected date only on initial render
  useEffect(() => {
    if (!wrapperRef.current || hasInitialScrollRef.current || !isMountedRef.current) return

    const selectedDate = $app.datePickerState.selectedDate.value
    const selectedDayElement = wrapperRef.current.querySelector(
      `.sx__list-day[data-date="${selectedDate}"]`
    )

    if (selectedDayElement) {
      requestAnimationFrame(() => {
        if (isMountedRef.current) {
          selectedDayElement.scrollIntoView({ 
            behavior: 'instant',
            block: 'start' 
          })
          hasInitialScrollRef.current = true
        }
      })
    }
  }, [daysWithEvents, $app.datePickerState.selectedDate.value])

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    if (!wrapperRef.current || !isMountedRef.current) return

    const wrapper = wrapperRef.current
    if (isLoadingEarlierRef.current && isLoadingMoreRef.current) return

    const range = $app.calendarState.range.value
    if (!range) return

    const allDays = wrapper.querySelectorAll('.sx__list-day')
    
    // Check for upward scroll
    if (!isLoadingEarlierRef.current) {
      const daysAboveViewport = Array.from(allDays).filter(day => {
        const rect = day.getBoundingClientRect()
        return rect.bottom < 0
      }).length

      const firstVisibleDay = Array.from(allDays).find(day => {
        const rect = day.getBoundingClientRect()
        return rect.top >= 0
      })

      if (firstVisibleDay) {
        const firstVisibleDate = firstVisibleDay.getAttribute('data-date')
        if (!firstVisibleDate) return

        const twoWeeksBeforeFirstVisible = addDays(firstVisibleDate, -14)
        const needsMoreDates = range.start > twoWeeksBeforeFirstVisible
        const isAtTop = wrapper.scrollTop === 0
        const hasFewDaysAbove = daysAboveViewport <= 3

        if ((isAtTop || hasFewDaysAbove) && needsMoreDates) {
          isLoadingEarlierRef.current = true
          const newStartDate = addDays(range.start, -14)
          $app.calendarState.range.value = {
            start: newStartDate,
            end: range.end
          }
          setTimeout(() => {
            if (isMountedRef.current) {
              isLoadingEarlierRef.current = false
            }
          }, 1000)
        }
      }
    }

    // Check for downward scroll
    if (!isLoadingMoreRef.current) {
      const daysBelowViewport = Array.from(allDays).filter(day => {
        const rect = day.getBoundingClientRect()
        return rect.top > wrapper.clientHeight && rect.bottom > wrapper.clientHeight
      }).length

      const lastVisibleDay = Array.from(allDays).findLast(day => {
        const rect = day.getBoundingClientRect()
        return rect.bottom <= wrapper.clientHeight
      })

      if (lastVisibleDay) {
        const lastVisibleDate = lastVisibleDay.getAttribute('data-date')
        if (!lastVisibleDate) return

        const twoWeeksAfterLastVisible = addDays(lastVisibleDate, 14)
        const needsMoreDates = range.end < twoWeeksAfterLastVisible
        const hasFewDaysBelow = daysBelowViewport <= 3

        if (hasFewDaysBelow && needsMoreDates) {
          isLoadingMoreRef.current = true
          const newEndDate = addDays(range.end, 14)
          $app.calendarState.range.value = {
            start: range.start,
            end: newEndDate
          }
          setTimeout(() => {
            if (isMountedRef.current) {
              isLoadingMoreRef.current = false
            }
          }, 1000)
        }
      }
    }
  }, [$app.calendarState.range.value])

  // Set up scroll listener with debounce
  useEffect(() => {
    if (!wrapperRef.current) return

    let scrollTimeout: number | null = null
    const debouncedScroll = () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout)
      }
      scrollTimeout = window.setTimeout(handleScroll, 100)
    }

    wrapperRef.current.addEventListener('scroll', debouncedScroll)

    return () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout)
      }
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', debouncedScroll)
      }
    }
  }, [handleScroll])

  const renderEventTimes = (event: CalendarEventInternal, dayDate: string) => {
    const eventStartDate = dateFromDateTime(event.start)
    const eventEndDate = event.end
      ? dateFromDateTime(event.end)
      : eventStartDate
    const isFirstDay = eventStartDate === dayDate
    const isLastDay = eventEndDate === dayDate
    const isMultiDay = eventStartDate !== eventEndDate

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: $app.config.locale.value === 'en-US',
    } as const

    if (!isMultiDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {toJSDate(event.start).toLocaleTimeString(
              $app.config.locale.value,
              timeOptions
            )}
          </div>
          {event.end && (
            <div className="sx__list-event-end-time">
              {toJSDate(event.end).toLocaleTimeString(
                $app.config.locale.value,
                timeOptions
              )}
            </div>
          )}
        </>
      )
    }

    if (isFirstDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {toJSDate(event.start).toLocaleTimeString(
              $app.config.locale.value,
              timeOptions
            )}
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
            {toJSDate(event.end).toLocaleTimeString(
              $app.config.locale.value,
              timeOptions
            )}
          </div>
        </>
      )
    }

    return <div className="sx__list-event-arrow">↔</div>
  }

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__list-wrapper" ref={wrapperRef}>
        {daysWithEvents.length === 0 ? (
          <div className="sx__list-no-events">
            {$app.translate('No events')}
          </div>
        ) : (
          daysWithEvents.map((day) => (
            <div 
              key={day.date} 
              className="sx__list-day"
              data-date={day.date}
            >
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
              <div className="sx__list-day-events">
                {day.events.map((event, index) => (
                  <div
                    key={event.id}
                    className="sx__list-event"
                    style={{
                      borderTop: index === 0 ? 'none' : '1px solid #e0e0e0',
                    }}
                  >
                    <div
                      className="sx__list-event-color-line"
                      style={{
                        backgroundColor: `var(--sx-color-${event._color})`,
                      }}
                    />
                    <div className="sx__list-event-content">
                      <div className="sx__list-event-title">{event.title}</div>
                      <div className="sx__list-event-times">
                        {renderEventTimes(event, day.date)}
                      </div>
                    </div>
                  </div>
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

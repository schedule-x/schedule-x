import { AppContext } from '../../../utils/stateful/app-context'
import { useEffect, useState, useRef } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

interface DayWithEvents {
  date: string
  events: CalendarEventInternal[]
  opacity: number
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
  const scrollObserverRef = useRef<IntersectionObserver | null>(null)
  const opacityObserversRef = useRef<Map<Element, IntersectionObserver>>(new Map())
  const isLoadingMoreRef = useRef(false)
  const isLoadingEarlierRef = useRef(false)
  const previousDaysRef = useRef<Map<string, number>>(new Map())
  const hasInitialScrollRef = useRef(false)
  const hasInitialRangeRef = useRef(false)

  // Initialize range with earliest and latest event dates only once
  useEffect(() => {
    const events = $app.calendarEvents.list.value
    if (events.length === 0 || hasInitialRangeRef.current) return

    // Find earliest and latest dates from events
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

    const daysWithEventsMap = events.reduce(
      (
        acc: Record<string, CalendarEventInternal[]>,
        event: CalendarEventInternal
      ) => {
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
        events: events.sort(
          (a: CalendarEventInternal, b: CalendarEventInternal) => {
            const aStart = a.start
            const bStart = b.start
            return aStart.localeCompare(bStart)
          }
        ),
        opacity: previousDaysRef.current.get(date) ?? 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Filter days to only show those within the current range
    const filteredDays = sortedDays.filter(
      (day) => 
        day.date >= range.start && 
        day.date <= range.end
    )

    setDaysWithEvents(filteredDays)
  }, [$app.calendarEvents.list.value, $app.calendarState.range.value])

  // Scroll to selected date only on initial render
  useEffect(() => {
    if (!wrapperRef.current || hasInitialScrollRef.current) return

    const selectedDate = $app.datePickerState.selectedDate.value
    const selectedDayElement = wrapperRef.current.querySelector(
      `.sx__list-day[data-date="${selectedDate}"]`
    )

    if (selectedDayElement) {
      requestAnimationFrame(() => {
        selectedDayElement.scrollIntoView({ 
          behavior: 'instant',
          block: 'start' 
        })
        hasInitialScrollRef.current = true
      })
    }
  }, [daysWithEvents])

  // Set up intersection observer for opacity updates
  useEffect(() => {
    if (!wrapperRef.current) return

    // Cleanup previous opacity observers
    opacityObserversRef.current.forEach((observer, element) => {
      observer.disconnect()
      opacityObserversRef.current.delete(element)
    })

    const days = wrapperRef.current.querySelectorAll('.sx__list-day')
    days.forEach((day, index) => {
      // Skip if already observed
      if (opacityObserversRef.current.has(day)) return

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            setDaysWithEvents(prev => {
              const newDays = [...prev]
              newDays[index] = { ...newDays[index], opacity: 1 }
              // Store the opacity in our ref
              previousDaysRef.current.set(newDays[index].date, 1)
              return newDays
            })
            // Cleanup observer after opacity is set
            observer.disconnect()
            opacityObserversRef.current.delete(day)
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      )
      observer.observe(day)
      opacityObserversRef.current.set(day, observer)
    })

    return () => {
      // Cleanup all opacity observers
      opacityObserversRef.current.forEach((observer) => {
        observer.disconnect()
      })
      opacityObserversRef.current.clear()
    }
  }, [daysWithEvents])

  // Set up scroll listener for infinite scroll in both directions
  useEffect(() => {
    if (!wrapperRef.current) return

    const checkForMoreDays = () => {
      const wrapper = wrapperRef.current
      if (!wrapper || (isLoadingEarlierRef.current && isLoadingMoreRef.current)) return

      const range = $app.calendarState.range.value
      if (!range) return

      const allDays = wrapper.querySelectorAll('.sx__list-day')
      
      // Check for upward scroll
      if (!isLoadingEarlierRef.current) {
        // Count days that are above the viewport
        const daysAboveViewport = Array.from(allDays).filter(day => {
          const rect = day.getBoundingClientRect()
          return rect.bottom < 0
        }).length

        // Find the first visible day
        const firstVisibleDay = Array.from(allDays).find(day => {
          const rect = day.getBoundingClientRect()
          return rect.top >= 0
        })

        if (firstVisibleDay) {
          const firstVisibleDate = firstVisibleDay.getAttribute('data-date')
          if (!firstVisibleDate) return

          // Calculate if we need more dates
          const twoWeeksBeforeFirstVisible = addDays(firstVisibleDate, -14)
          const needsMoreDates = range.start > twoWeeksBeforeFirstVisible

          // Check if we're at the top and scrolling up, or if we have 3 or fewer days above
          const isAtTop = wrapper.scrollTop === 0
          const hasFewDaysAbove = daysAboveViewport <= 3

          if ((isAtTop || hasFewDaysAbove) && needsMoreDates) {
            isLoadingEarlierRef.current = true
            // Extend range backwards by 2 weeks
            const newStartDate = addDays(range.start, -14)
            $app.calendarState.range.value = {
              start: newStartDate,
              end: range.end
            }
            // Reset loading flag after a short delay
            setTimeout(() => {
              isLoadingEarlierRef.current = false
            }, 1000)
          }
        }
      }

      // Check for downward scroll
      if (!isLoadingMoreRef.current) {
        // Count days that are below the viewport
        const daysBelowViewport = Array.from(allDays).filter(day => {
          const rect = day.getBoundingClientRect()
          return rect.top > wrapper.clientHeight && rect.bottom > wrapper.clientHeight
        }).length

        // Find the last visible day
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
            // Reset loading flag after a short delay
            setTimeout(() => {
              isLoadingMoreRef.current = false
            }, 1000)
          }
        }
      }
    }

    // Add scroll listener
    wrapperRef.current.addEventListener('scroll', checkForMoreDays)

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', checkForMoreDays)
      }
    }
  }, [daysWithEvents, $app.calendarState.range.value])

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
          daysWithEvents.map((day, index) => (
            <div 
              key={day.date} 
              className="sx__list-day"
              data-date={day.date}
              style={{
                opacity: day.opacity,
                transition: 'opacity 0.3s ease-in-out'
              }}
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

import { AppContext } from '../../../utils/stateful/app-context'
import { useContext, useEffect, useState, useRef } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { format, isSameDay, parseISO, addDays as dateFnsAddDays } from 'date-fns'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

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
  const previousDaysRef = useRef<Map<string, number>>(new Map())

  // Initialize range with selected date + 2 weeks
  useEffect(() => {
    const selectedDate = $app.datePickerState.selectedDate.value
    const endDate = dateFnsAddDays(parseISO(selectedDate), 14).toISOString().split('T')[0]
    $app.calendarState.range.value = {
      start: selectedDate,
      end: endDate
    }
  }, [$app.datePickerState.selectedDate.value])

  // Update days with events when range or events change
  useEffect(() => {
    const range = $app.calendarState.range.value
    if (!range) return

    const events = $app.calendarEvents.list.value
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
        opacity: previousDaysRef.current.get(date) ?? 0, // Use previous opacity or 0
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

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!wrapperRef.current) return

    // Cleanup previous scroll observer
    if (scrollObserverRef.current) {
      scrollObserverRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0]
        if (lastEntry.isIntersecting && !isLoadingMoreRef.current) {
          const wrapper = wrapperRef.current
          if (!wrapper) return

          const range = $app.calendarState.range.value
          if (!range) return

          // Check if we're actually near the bottom of the scroll
          const isNearBottom = 
            wrapper.scrollHeight - wrapper.scrollTop - wrapper.clientHeight < 100

          if (isNearBottom) {
            isLoadingMoreRef.current = true
            // Extend range by 2 weeks
            const newEndDate = dateFnsAddDays(parseISO(range.end), 14).toISOString().split('T')[0]
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
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    // Observe the last day element
    const lastDay = wrapperRef.current.querySelector('.sx__list-day:last-child')
    if (lastDay) {
      observer.observe(lastDay)
    }

    scrollObserverRef.current = observer

    return () => {
      if (scrollObserverRef.current) {
        scrollObserverRef.current.disconnect()
      }
    }
  }, [daysWithEvents, $app.calendarState.range.value])

  // Update opacity based on visibility
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

  const renderEventTimes = (event: CalendarEventInternal, dayDate: string) => {
    const eventStartDate = dateFromDateTime(event.start)
    const eventEndDate = event.end
      ? dateFromDateTime(event.end)
      : eventStartDate
    const isFirstDay = isSameDay(parseISO(eventStartDate), parseISO(dayDate))
    const isLastDay = isSameDay(parseISO(eventEndDate), parseISO(dayDate))
    const isMultiDay = !isSameDay(
      parseISO(eventStartDate),
      parseISO(eventEndDate)
    )

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

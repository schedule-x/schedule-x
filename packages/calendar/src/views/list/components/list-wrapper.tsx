import { AppContext } from '../../../utils/stateful/app-context'
import { useEffect, useState, useCallback, useRef } from 'preact/hooks'
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
  onScrollDayIntoView?: (date: string) => void
}

export const ListWrapper: PreactViewComponent = ({
  $app,
  id,
}: ListWrapperProps) => {
  const [daysWithEvents, setDaysWithEvents] = useState<DayWithEvents[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const updateDaysWithEvents = useCallback(
    (
      events: CalendarEventInternal[],
      range: { start: string; end: string }
    ) => {
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
          events: events.sort((a, b) => a.start.localeCompare(b.start)),
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      const filteredDays = sortedDays.filter(
        (day) => day.date >= range.start && day.date <= range.end
      )

      setDaysWithEvents(filteredDays)
    },
    []
  )

  useEffect(() => {
    const events = $app.calendarEvents.list.value
    if (events.length === 0) return

    const dates = events.flatMap((event) => {
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
      end: latestDate,
    }
  }, [$app.calendarEvents.list.value])

  useEffect(() => {
    const events = $app.calendarEvents.list.value
    const range = $app.calendarState.range.value
    if (!range) return

    updateDaysWithEvents(events, range)
  }, [
    $app.calendarEvents.list.value,
    $app.calendarState.range.value,
    updateDaysWithEvents,
  ])

  useEffect(() => {
    if (!wrapperRef.current || !$app.config.callbacks.onScrollDayIntoView)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const date = entry.target.getAttribute('data-date')
            if (date && $app.config.callbacks.onScrollDayIntoView) {
              $app.config.callbacks.onScrollDayIntoView(date)
            }
          }
        })
      },
      {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    const dayElements = wrapperRef.current.querySelectorAll('.sx__list-day')
    dayElements.forEach((dayElement) => {
      observer.observe(dayElement)
    })

    return () => {
      observer.disconnect()
    }
  }, [daysWithEvents, $app.config.callbacks.onScrollDayIntoView])

  useEffect(() => {
    if (!wrapperRef.current) return

    const selectedDate = $app.datePickerState.selectedDate.value
    const selectedDayElement = wrapperRef.current.querySelector(
      `.sx__list-day[data-date="${selectedDate}"]`
    )

    if (selectedDayElement) {
      requestAnimationFrame(() => {
        selectedDayElement.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        })
      })
    }
  }, [daysWithEvents, $app.datePickerState.selectedDate.value])

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
            <div key={day.date} className="sx__list-day" data-date={day.date}>
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

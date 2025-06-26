import { AppContext } from '../../../utils/stateful/app-context'
import { useCallback, useEffect, useRef, useState, } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { scrollOnDateSelection } from '../utils/stateless/scroll-on-date-selection'

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

  const updateDaysWithEvents = (events: CalendarEventInternal[]) => {
    const daysWithEventsMap = events.reduce(
      (
        acc: Record<string, CalendarEventInternal[]>,
        event: CalendarEventInternal
      ) => {
        const startDate = dateFromDateTime(event.start)
        const endDate = dateFromDateTime(event.end)
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
    /**
     * onScrollDayIntoView can never be allowed to be called as a side effect of events changing.
     * Otherwise, implementers will have to write custom logic to prevent infinite recursion.
     *
     * Open to any ideas for how to improve this and make do without a timeout.
     * */
    blockOnScrollDayIntoViewCallback.current = true
    updateDaysWithEvents($app.calendarEvents.list.value)
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
    if (!wrapperRef.current || !$app.config.callbacks.onScrollDayIntoView)
      return

    const _observer =
      interSectionObserver ||
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const date = entry.target.getAttribute('data-date')
              if (
                date &&
                $app.config.callbacks.onScrollDayIntoView &&
                !blockOnScrollDayIntoViewCallback.current
              ) {
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
      _observer.observe(dayElement)
    })

    setIntersectionObserver(_observer)

    return () => {
      _observer.disconnect()
    }
  }, [daysWithEvents])

  useEffect(() => {
    scrollOnDateSelection($app, wrapperRef)
  }, [daysWithEvents, $app.datePickerState.selectedDate.value])

  const renderEventTimes = (event: CalendarEventInternal, dayDate: string) => {
    const eventStartDate = dateFromDateTime(event.start)
    const eventEndDate = dateFromDateTime(event.end)
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
                  <div key={event.id} className="sx__event sx__list-event">
                    <div
                      className={`sx__list-event-color-line`}
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

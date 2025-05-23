import { AppContext } from '../../../utils/stateful/app-context'
import { useContext, useEffect, useState } from 'preact/hooks'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { format, isSameDay, parseISO } from 'date-fns'
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

  useEffect(() => {
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
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    setDaysWithEvents(sortedDays)
  }, [$app.calendarEvents.list.value, $app.datePickerState.selectedDate.value])

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
      <div id={id} className="sx__list-wrapper">
        {daysWithEvents.map((day) => (
          <div key={day.date} className="sx__list-day">
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
        ))}
      </div>
    </AppContext.Provider>
  )
}

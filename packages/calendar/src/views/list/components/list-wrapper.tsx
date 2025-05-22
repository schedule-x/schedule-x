import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'
import { filterByRange } from '../../../utils/stateless/events/filter-by-range'
import { useSignalEffect } from '@preact/signals'
import {
  format,
  isSameDay,
  parseISO,
  addDays,
  isAfter,
  isBefore,
} from 'date-fns'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'

interface DayEvents {
  date: string
  events: any[]
}

const getAllEventDates = (startDate: string, endDate: string): string[] => {
  let currentDate = startDate
  const dates = [currentDate]

  while (currentDate < endDate) {
    currentDate = format(addDays(parseISO(currentDate), 1), 'yyyy-MM-dd')
    dates.push(currentDate)
  }

  return dates
}

export const ListWrapper: PreactViewComponent = ({ $app, id }) => {
  const [daysWithEvents, setDaysWithEvents] = useState<DayEvents[]>([])

  useSignalEffect(() => {
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value

    // Group events by day
    const eventsByDay = filteredEvents.reduce(
      (acc: { [key: string]: any[] }, event) => {
        const startDate = dateFromDateTime(event.start)
        const endDate = event.end ? dateFromDateTime(event.end) : startDate

        // For multi-day events, add them to each day they span
        getAllEventDates(startDate, endDate).forEach((date) => {
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(event)
        })
        return acc
      },
      {}
    )

    // Convert to array and sort by date
    const sortedDays = Object.entries(eventsByDay)
      .map(([date, events]) => ({
        date,
        events: events.sort(sortEventsByStartAndEnd),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    setDaysWithEvents(sortedDays)
  })

  const renderEventTimes = (event: any, dayDate: string) => {
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

    if (!isMultiDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {format(toJSDate(event.start), 'h:mm a')}
          </div>
          {event.end && (
            <div className="sx__list-event-end-time">
              {format(toJSDate(event.end), 'h:mm a')}
            </div>
          )}
        </>
      )
    }

    if (isFirstDay) {
      return (
        <>
          <div className="sx__list-event-start-time">
            {format(toJSDate(event.start), 'h:mm a')}
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
            {format(toJSDate(event.end), 'h:mm a')}
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
                {format(toJSDate(day.date), 'EEEE, MMMM d, yyyy')}
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

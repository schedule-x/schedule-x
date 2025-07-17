import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect, useState } from 'preact/hooks'
import { MonthAgenda } from '../types/month-agenda'
import { createAgendaMonth } from '../utils/stateless/create-agenda-month'
import MonthAgendaWeek from './month-agenda-week'
import MonthAgendaDayNames from './month-agenda-day-names'
import { AppContext } from '../../../utils/stateful/app-context'
import { positionEventsInAgenda } from '../utils/stateless/position-events-in-agenda'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'
import MonthAgendaEvents from './month-agenda-events'

import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'

export const MonthAgendaWrapper: PreactViewComponent = ({ $app, id }) => {
  const getMonth = () => {
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value

    return positionEventsInAgenda(
      createAgendaMonth(
        $app.datePickerState.selectedDate.value.toZonedDateTime($app.config.timezone.value),
        $app.timeUnitsImpl
      ),
      filteredEvents.sort(sortEventsByStartAndEnd)
    )
  }

  const [agendaMonth, setAgendaMonth] = useState<MonthAgenda>(getMonth())

  useEffect(() => {
    setAgendaMonth(getMonth())
  }, [
    $app.datePickerState.selectedDate.value,
    $app.calendarEvents.list.value,
    $app.calendarEvents.filterPredicate.value,
  ])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const mutatedElement = mutation.target as HTMLElement
        if (mutatedElement.dataset.agendaFocus === 'true')
          mutatedElement.focus()
      })
    })
    const monthViewElement = document.getElementById(id) as HTMLElement
    observer.observe(monthViewElement, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-agenda-wrapper">
        <MonthAgendaDayNames week={agendaMonth.weeks[0]} />

        <div className="sx__month-agenda-weeks">
          {agendaMonth.weeks.map((week, index) => (
            <MonthAgendaWeek
              key={index}
              week={week}
              setActiveDate={(date: Temporal.PlainDate) =>
                ($app.datePickerState.selectedDate.value = date)
              }
              activeDate={$app.datePickerState.selectedDate.value}
            />
          ))}
        </div>

        <MonthAgendaEvents
          key={$app.datePickerState.selectedDate.value}
          events={
            agendaMonth.weeks
              .flat()
              .find(
                (day) => isSameDay(day.date, $app.datePickerState.selectedDate.value)
              )?.events || []
          }
        />
      </div>
    </AppContext.Provider>
  )
}

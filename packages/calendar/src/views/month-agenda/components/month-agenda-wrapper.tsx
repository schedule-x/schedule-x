import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect } from 'preact/hooks'
import { createAgendaMonth } from '../utils/stateless/create-agenda-month'
import MonthAgendaWeek from './month-agenda-week'
import MonthAgendaDayNames from './month-agenda-day-names'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthAgendaEvents from './month-agenda-events'
import { useAgenda } from '../hooks/use-agenda'

import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'

export const MonthAgendaWrapper: PreactViewComponent = ({ $app, id }) => {
  const agenda = useAgenda($app, createAgendaMonth)
  const selectedMonth = $app.datePickerState.selectedDate.value.month

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
        <MonthAgendaDayNames week={agenda.weeks[0]} />

        <div className="sx__month-agenda-weeks">
          {agenda.weeks.map((week, index) => (
            <MonthAgendaWeek
              key={index}
              week={week}
              setActiveDate={(date: Temporal.PlainDate) =>
                ($app.datePickerState.selectedDate.value = date)
              }
              activeDate={$app.datePickerState.selectedDate.value}
              isLeadingOrTrailing={(date) => date.month !== selectedMonth}
            />
          ))}
        </div>

        <MonthAgendaEvents
          key={$app.datePickerState.selectedDate.value}
          events={
            agenda.weeks
              .flat()
              .find((day) =>
                isSameDay(day.date, $app.datePickerState.selectedDate.value)
              )?.events || []
          }
        />
      </div>
    </AppContext.Provider>
  )
}

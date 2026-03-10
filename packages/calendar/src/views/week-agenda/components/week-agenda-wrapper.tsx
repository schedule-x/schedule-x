import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect } from 'preact/hooks'
import { createAgendaWeek } from '../../month-agenda/utils/stateless/create-agenda-week'
import MonthAgendaWeek from '../../month-agenda/components/month-agenda-week'
import MonthAgendaDayNames from '../../month-agenda/components/month-agenda-day-names'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthAgendaEvents from '../../month-agenda/components/month-agenda-events'
import { useAgenda } from '../../month-agenda/hooks/use-agenda'

import { isSameDay } from '@schedule-x/shared/src/utils/stateless/time/comparison'

export const WeekAgendaWrapper: PreactViewComponent = ({ $app, id }) => {
  const agenda = useAgenda($app, createAgendaWeek)

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const mutatedElement = mutation.target as HTMLElement
        if (mutatedElement.dataset.agendaFocus === 'true')
          mutatedElement.focus()
      })
    })
    const viewElement = document.getElementById(id) as HTMLElement
    observer.observe(viewElement, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-agenda-wrapper sx__week-agenda-wrapper">
        <div className="sx__week-agenda-header">
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
              />
            ))}
          </div>
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

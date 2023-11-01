import { PreactViewComponent } from '../../../types/preact-view-component'
import { useEffect, useState } from 'preact/compat'
import { MonthAgenda } from '../types/month-agenda'
import { createAgendaMonth } from '../utils/stateless/create-agenda-month'
import MonthAgendaWeek from './month-agenda-week'
import MonthAgendaDayNames from './month-agenda-day-names'
import { AppContext } from '../../../utils/stateful/app-context'

export const MonthAgendaWrapper: PreactViewComponent = ({ $app, id }) => {
  const [agendaMonth, setAgendaMonth] = useState<MonthAgenda>(
    createAgendaMonth(
      $app.datePickerState.selectedDate.value,
      $app.timeUnitsImpl
    )
  )

  useEffect(() => {
    setAgendaMonth(
      createAgendaMonth(
        $app.datePickerState.selectedDate.value,
        $app.timeUnitsImpl
      )
    )
  }, [$app.datePickerState.selectedDate.value])

  const [activeDate, setActiveDate] = useState(
    $app.datePickerState.selectedDate.value
  )

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-agenda-wrapper">
        <MonthAgendaDayNames week={agendaMonth.weeks[0]} />

        {agendaMonth.weeks.map((week) => (
          <MonthAgendaWeek
            week={week}
            setActiveDate={setActiveDate}
            activeDate={activeDate}
          />
        ))}
      </div>
    </AppContext.Provider>
  )
}

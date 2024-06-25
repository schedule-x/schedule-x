import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect, useState } from 'preact/hooks'
import YearAgendaMonth from './year-agenda-month'
import { YearAgenda as YearAgendaType } from '../types/year-agenda'
import { createAgendaYear } from '../utils/stateless/create-agenda-year'
import { AppContext } from '../../../utils/stateful/app-context'
import { positionEventsInYear } from '../utils/stateless/position-events-in-year'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'

export const YearAgendaWrapper: PreactViewComponent = ({ $app, id }) => {
  const getYear = () => {
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value

    return positionEventsInYear(
      createAgendaYear($app.datePickerState.selectedDate.value),
      filteredEvents.sort(sortEventsByStartAndEnd)
    )
  }

  const [agendaYear, setAgendaYear] = useState<YearAgendaType>(getYear())

  useEffect(() => {
    setAgendaYear(getYear())
  }, [
    $app.datePickerState.selectedDate.value,
    $app.calendarEvents.list.value,
    $app.calendarEvents.filterPredicate.value,
  ])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__year-agenda-wrapper">
        <div className="sx__year-agenda-container">
          {agendaYear.map((month, index) => (
            <YearAgendaMonth key={index} month={month} />
          ))}
        </div>
      </div>
    </AppContext.Provider>
  )
}

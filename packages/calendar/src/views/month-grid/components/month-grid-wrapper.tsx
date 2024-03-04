import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useEffect, useState } from 'preact/hooks'
import { createMonth } from '../utils/stateless/create-month'
import { Month } from '../types/month'
import MonthGridWeek from './month-grid-week'
import { AppContext } from '../../../utils/stateful/app-context'
import { positionInMonth } from '../utils/stateless/position-in-month'
import { sortEventsByStartAndEnd } from '../../../utils/stateless/events/sort-by-start-date'

export const MonthGridWrapper: PreactViewComponent = ({ $app, id }) => {
  const [month, setMonth] = useState<Month>([])

  useEffect(() => {
    $app.calendarEvents.list.value.forEach((event) => {
      event._eventFragments = {}
    })
    const newMonth = createMonth(
      $app.datePickerState.selectedDate.value,
      $app.timeUnitsImpl
    )
    setMonth(
      positionInMonth(
        newMonth,
        $app.calendarEvents.list.value.sort(sortEventsByStartAndEnd)
      )
    )
  }, [
    $app.calendarState.range.value?.start,
    $app.calendarState.range.value?.end,
    $app.calendarEvents.list.value,
  ])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-grid-wrapper">
        {month.map((week, index) => (
          <MonthGridWeek
            key={index + new Date().getTime()}
            week={week}
            isFirstWeek={index === 0}
          />
        ))}
      </div>
    </AppContext.Provider>
  )
}

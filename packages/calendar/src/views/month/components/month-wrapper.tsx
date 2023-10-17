import { PreactViewComponent } from '../../../types/preact-view-component'
import { useEffect, useState } from 'preact/compat'
import { createMonth } from '../utils/stateless/create-month'
import { Month } from '../types/month'
import MonthWeek from './month-week'
import { AppContext } from '../../../utils/stateful/app-context'
import { positionInMonth } from '../utils/stateless/position-in-month'

export const MonthWrapper: PreactViewComponent = ({ $app, id }) => {
  const [month, setMonth] = useState<Month>([])

  useEffect(() => {
    const newMonth = createMonth(
      $app.datePickerState.selectedDate.value,
      $app.timeUnitsImpl
    )
    setMonth(positionInMonth(newMonth, $app.calendarEvents.list.value))
  }, [
    $app.calendarState.range.value?.start,
    $app.calendarState.range.value?.end,
    $app.calendarEvents.list.value,
  ])

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-wrapper">
        {month.map((week, index) => (
          <MonthWeek week={week} isFirstWeek={index === 0} />
        ))}
      </div>
    </AppContext.Provider>
  )
}

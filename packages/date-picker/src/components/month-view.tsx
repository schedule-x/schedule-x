import { MONTH_VIEW } from '../constants/test-ids'
import MonthViewHeader from './month-view-header'
import DayNames from './day-names'
import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { MonthWithDates } from '../../../../shared/types/time'
import MonthViewWeek from './month-view-week'

export default function MonthView() {
  const $app = useContext(AppContext)
  const [month, setMonth] = useState<MonthWithDates>([])

  const renderMonth = () => {
    const newDatePickerDate = toJSDate(
      $app.datePickerState.datePickerDate.value
    )
    const newMonth = $app.timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
      newDatePickerDate.getFullYear(),
      newDatePickerDate.getMonth()
    )
    setMonth(newMonth)
  }

  useEffect(() => {
    renderMonth()
  }, [$app.datePickerState.datePickerDate.value])

  return (
    <>
      <div data-testid={MONTH_VIEW} class="sx__date-picker__month-view">
        <MonthViewHeader />

        <DayNames />

        {month.map((week) => (
          <MonthViewWeek week={week} />
        ))}
      </div>
    </>
  )
}

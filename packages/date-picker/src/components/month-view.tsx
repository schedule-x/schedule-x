import { MONTH_VIEW } from '../constants/test-ids'
import MonthViewHeader from './month-view-header'
import DayNames from './day-names'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { MonthWithDates } from '@schedule-x/shared/src/types/time'
import MonthViewWeek from './month-view-week'

type props = {
  seatYearsView: () => void
}

export default function MonthView({ seatYearsView }: props) {
  const $app = useContext(AppContext)
  const [month, setMonth] = useState<MonthWithDates>([])

  const renderMonth = () => {
    const newDatePickerDate = toJSDate(
      $app.datePickerState.datePickerDate.value
    )
    setMonth(
      $app.timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
        newDatePickerDate.getFullYear(),
        newDatePickerDate.getMonth()
      )
    )
  }

  useEffect(() => {
    renderMonth()
  }, [$app.datePickerState.datePickerDate.value])

  return (
    <>
      <div data-testid={MONTH_VIEW} className="sx__date-picker__month-view">
        <MonthViewHeader setYearsView={seatYearsView} />

        <DayNames />

        {month.map((week) => (
          <MonthViewWeek week={week} />
        ))}
      </div>
    </>
  )
}

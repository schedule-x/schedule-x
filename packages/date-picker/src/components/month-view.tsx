import { MONTH_VIEW } from '../constants/test-ids'
import MonthViewHeader from './month-view-header'
import DayNames from './day-names'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { MonthWithDates } from '@schedule-x/shared/src/types/time'
import MonthViewWeek from './month-view-week'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

type props = {
  seatYearsView: () => void
}

export default function MonthView({ seatYearsView }: props) {
  const elementId = randomStringId()
  const $app = useContext(AppContext)
  const [month, setMonth] = useState<MonthWithDates>([])

  const renderMonth = () => {
    const newDatePickerDate = $app.datePickerState.datePickerDate.value
    setMonth(
      $app.timeUnitsImpl.getMonthWithTrailingAndLeadingDays(
        newDatePickerDate.year,
        newDatePickerDate.month
      )
    )
  }

  useEffect(() => {
    renderMonth()
  }, [$app.datePickerState.datePickerDate.value])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const mutatedElement = mutation.target as HTMLElement
        if (mutatedElement.dataset.focus === 'true') mutatedElement.focus()
      })
    })
    const monthViewElement = document.getElementById(elementId) as HTMLElement
    observer.observe(monthViewElement, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        id={elementId}
        data-testid={MONTH_VIEW}
        className="sx__date-picker__month-view"
      >
        <MonthViewHeader setYearsView={seatYearsView} />

        <DayNames />

        {month.map((week) => (
          <MonthViewWeek week={week} />
        ))}
      </div>
    </>
  )
}

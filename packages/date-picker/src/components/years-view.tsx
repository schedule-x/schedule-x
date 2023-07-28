import { YEARS_VIEW } from '../constants/test-ids'
import YearsViewAccordion from './years-view-accordion'
import { useContext, useState } from 'preact/compat'
import { toDateString } from '../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { AppContext } from '../utils/stateful/app-context'

type props = {
  setMonthView: () => void
}

export default function YearsView({ setMonthView }: props) {
  const $app = useContext(AppContext)
  const years = [...Array(26).keys()].map((_, i) => i + 2000)
  const [expandedYear, setExpandedYear] = useState<number>(
    new Date().getFullYear()
  )

  const setNewDatePickerDate = (year: number, month: number) => {
    $app.datePickerState.datePickerDate.value = toDateString(
      new Date(year, month, 1)
    )
    setMonthView()
  }

  return (
    <>
      <ul data-testid={YEARS_VIEW}>
        {years.map((year) => (
          <YearsViewAccordion
            year={year}
            setYearAndMonth={(year, month) => setNewDatePickerDate(year, month)}
            isExpanded={expandedYear === year}
            expand={(year) => setExpandedYear(year)}
          />
        ))}
      </ul>
    </>
  )
}

import { YEARS_VIEW } from '../constants/test-ids'
import YearsViewAccordion from './years-view-accordion'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'

type props = {
  setMonthView: () => void
}

export default function YearsView({ setMonthView }: props) {
  const $app = useContext(AppContext)
  const minYear = $app.config.min.year
  const maxYear = $app.config.max.year
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  )
  const selectedYear = $app.datePickerState.selectedDate.value.year
  const [expandedYear, setExpandedYear] = useState<number>(selectedYear)

  const setNewDatePickerDate = (year: number, month: number) => {
    $app.datePickerState.datePickerDate.value = Temporal.PlainDate.from({
      year,
      month,
      day: 1,
    })
    setMonthView()
  }

  useEffect(() => {
    const initiallyExpandedYear = document
      .querySelector('.sx__date-picker__years-view')
      ?.querySelector('.sx__is-expanded')
    if (!initiallyExpandedYear) return

    initiallyExpandedYear.scrollIntoView({
      block: 'center',
    })
  }, [])

  return (
    <>
      <ul className="sx__date-picker__years-view" data-testid={YEARS_VIEW}>
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

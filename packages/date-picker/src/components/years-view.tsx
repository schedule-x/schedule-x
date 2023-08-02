import { YEARS_VIEW } from '../constants/test-ids'
import YearsViewAccordion from './years-view-accordion'
import { useContext, useEffect, useState } from 'preact/compat'
import { toDateString } from '../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'

type props = {
  setMonthView: () => void
}

export default function YearsView({ setMonthView }: props) {
  const $app = useContext(AppContext)
  const minYear = toJSDate($app.config.min).getFullYear()
  const maxYear = toJSDate($app.config.max).getFullYear()
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  )
  const [expandedYear, setExpandedYear] = useState<number>(
    new Date().getFullYear()
  )

  const setNewDatePickerDate = (year: number, month: number) => {
    $app.datePickerState.datePickerDate.value = toDateString(
      new Date(year, month, 1)
    )
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
      <ul class="sx__date-picker__years-view" data-testid={YEARS_VIEW}>
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

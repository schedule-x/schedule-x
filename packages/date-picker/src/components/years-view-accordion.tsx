import { useContext } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toLocalizedMonth } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'

type props = {
  year: number
  setYearAndMonth: (year: number, month: number) => void
  isExpanded: boolean
  expand: (year: number) => void
}

export default function YearsViewAccordion({
  year,
  setYearAndMonth,
  isExpanded,
  expand,
}: props) {
  const $app = useContext(AppContext)

  const yearWithDates = $app.timeUnitsImpl.getMonthsFor(year)

  const handleClickOnMonth = (event: MouseEvent, month: Date) => {
    event.stopPropagation()
    setYearAndMonth(year, month.getMonth())
  }

  return (
    <>
      <li class={isExpanded ? 'sx__is-expanded' : ''}>
        <button
          class="sx__date-picker__years-accordion__expand-button sx__ripple--wide"
          onClick={() => expand(year)}
        >
          {year}
        </button>
        {isExpanded && (
          <div class="sx__date-picker__years-view-accordion__panel">
            {yearWithDates.map((month) => (
              <button
                class="sx__date-picker__years-view-accordion__month"
                onClick={(event) => handleClickOnMonth(event, month)}
              >
                {toLocalizedMonth(month, $app.config.locale)}
              </button>
            ))}
          </div>
        )}
      </li>
    </>
  )
}

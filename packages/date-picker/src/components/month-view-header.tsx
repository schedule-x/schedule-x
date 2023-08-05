import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toLocalizedMonth } from '../../../../shared/utils/stateless/time/date-time-localization/date-time-localization'
import {
  toIntegers,
  toJSDate,
} from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import {
  getFirstDayOfNextMonth,
  getFirstDayOPreviousMonth,
} from '../../../../shared/utils/stateless/time/date-time-mutation/date-time-mutation'
import chevronIcon from '../assets/chevron-navigation.svg'

type props = {
  setYearsView: () => void
}

export default function MonthViewHeader({ setYearsView }: props) {
  const $app = useContext(AppContext)
  const dateStringToLocalizedMonthName = (selectedDate: string) => {
    const selectedDateJS = toJSDate(selectedDate)

    return toLocalizedMonth(selectedDateJS, $app.config.locale)
  }

  const getYearFrom = (datePickerDate: string) => {
    const { year } = toIntegers(datePickerDate)
    return year
  }

  const [selectedDateMonthName, setSelectedDateMonthName] = useState(
    dateStringToLocalizedMonthName($app.datePickerState.datePickerDate.value)
  )
  const [datePickerYear, setDatePickerYear] = useState(
    getYearFrom($app.datePickerState.datePickerDate.value)
  )

  const setPreviousMonth = () => {
    $app.datePickerState.datePickerDate.value = getFirstDayOPreviousMonth(
      $app.datePickerState.datePickerDate.value
    )
  }

  const setNextMonth = () => {
    $app.datePickerState.datePickerDate.value = getFirstDayOfNextMonth(
      $app.datePickerState.datePickerDate.value
    )
  }

  useEffect(() => {
    setSelectedDateMonthName(
      dateStringToLocalizedMonthName($app.datePickerState.datePickerDate.value)
    )
    setDatePickerYear(getYearFrom($app.datePickerState.datePickerDate.value))
  }, [$app.datePickerState.datePickerDate.value])

  return (
    <>
      <header class="sx__date-picker__month-view-header">
        <button
          onClick={() => setPreviousMonth()}
        >
          <img
            class="sx__date-picker__chevron sx__date-picker__chevron--previous"
            src={chevronIcon}
            alt="previous month"
          />
        </button>
        <span
          class="sx__date-picker__month-view-header__month-year"
          onClick={() => setYearsView()}
        >
          {selectedDateMonthName + ' ' + datePickerYear}
        </span>
        <button
          onClick={() => setNextMonth()}
        >
          <img
            class="sx__date-picker__chevron sx__date-picker__chevron--next"
            src={chevronIcon}
            alt="next month"
          />
        </button>
      </header>
    </>
  )
}

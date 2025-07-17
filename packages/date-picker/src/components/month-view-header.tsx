import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toLocalizedMonth } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import {
  toIntegers,
  toJSDate,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import {
  getFirstDayOfNextMonth,
  getFirstDayOPreviousMonth,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/date-time-mutation'
import Chevron from '@schedule-x/shared/src/components/buttons/chevron'


type props = {
  setYearsView: () => void
}

export default function MonthViewHeader({ setYearsView }: props) {
  const $app = useContext(AppContext)
  const dateStringToLocalizedMonthName = (selectedDate: Temporal.PlainDate) => {
    return toLocalizedMonth(selectedDate, $app.config.locale.value)
  }

  const getYearFrom = (datePickerDate: Temporal.PlainDate) => {
    return datePickerDate.year
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

  const handleOpenYearsView = (e: MouseEvent) => {
    e.stopPropagation()
    setYearsView()
  }

  return (
    <>
      <header className="sx__date-picker__month-view-header">
        <Chevron
          direction={'previous'}
          onClick={() => setPreviousMonth()}
          buttonText={$app.translate('Previous month')}
        />

        <button
          type="button"
          className="sx__date-picker__month-view-header__month-year"
          onClick={(event) => handleOpenYearsView(event)}
        >
          {selectedDateMonthName + ' ' + datePickerYear}
        </button>

        <Chevron
          direction={'next'}
          onClick={() => setNextMonth()}
          buttonText={$app.translate('Next month')}
        />
      </header>
    </>
  )
}

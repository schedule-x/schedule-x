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

export default function MonthViewHeader() {
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
        <button onClick={() => setPreviousMonth()}>prev</button>
        <span>{selectedDateMonthName + ' ' + datePickerYear}</span>
        <button onClick={() => setNextMonth()}>next</button>
      </header>
    </>
  )
}

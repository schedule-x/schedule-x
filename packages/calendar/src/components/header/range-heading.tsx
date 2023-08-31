import { AppContext } from '../../utils/stateful/app-context'
import { useContext, useEffect, useState } from 'preact/compat'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { DateRange } from '../../types/date-range'

export default function RangeHeading() {
  const $app = useContext(AppContext)

  const [currentMonthOrMonths, setCurrentMonthOrMonths] = useState<string>(
    '' as string
  )

  useEffect(() => {
    const firstDate = ($app.calendarState.range.value as DateRange).start
    const secondDate = ($app.calendarState.range.value as DateRange).end

    const firstDateMonth = toJSDate(firstDate).toLocaleString(
      $app.config.locale,
      { month: 'long' }
    )
    const firstDateYear = toJSDate(firstDate).toLocaleString(
      $app.config.locale,
      { year: 'numeric' }
    )
    const secondDateMonth = toJSDate(secondDate).toLocaleString(
      $app.config.locale,
      { month: 'long' }
    )
    const secondDateYear = toJSDate(secondDate).toLocaleString(
      $app.config.locale,
      { year: 'numeric' }
    )

    if (
      firstDateMonth === secondDateMonth &&
      firstDateYear === secondDateYear
    ) {
      setCurrentMonthOrMonths(`${firstDateMonth} ${firstDateYear}`)
    } else if (
      firstDateMonth !== secondDateMonth &&
      firstDateYear === secondDateYear
    ) {
      setCurrentMonthOrMonths(
        `${firstDateMonth} – ${secondDateMonth} ${firstDateYear}`
      )
    } else {
      setCurrentMonthOrMonths(
        `${firstDateMonth} ${firstDateYear} – ${secondDateMonth} ${secondDateYear}`
      )
    }
  }, [$app.calendarState.range.value])

  return <span className={'sx__range-heading'}>{currentMonthOrMonths}</span>
}

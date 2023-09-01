import { AppContext } from '../../utils/stateful/app-context'
import { useContext, useEffect, useState } from 'preact/compat'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { DateRange } from '../../types/date-range'

export default function RangeHeading() {
  const $app = useContext(AppContext)

  const [currentHeading, setCurrentHeading] = useState<string>('' as string)

  useEffect(() => {
    const firstDate = ($app.calendarState.range.value as DateRange).start
    const secondDate = ($app.calendarState.range.value as DateRange).end
    const localeStringMonthArgs = [
      $app.config.locale,
      { month: 'long' },
    ] as const
    const localeStringYearArgs = [
      $app.config.locale,
      { year: 'numeric' },
    ] as const
    const firstDateMonth = toJSDate(firstDate).toLocaleString(
      ...localeStringMonthArgs
    )
    const firstDateYear = toJSDate(firstDate).toLocaleString(
      ...localeStringYearArgs
    )
    const secondDateMonth = toJSDate(secondDate).toLocaleString(
      ...localeStringMonthArgs
    )
    const secondDateYear = toJSDate(secondDate).toLocaleString(
      ...localeStringYearArgs
    )

    if (
      firstDateMonth === secondDateMonth &&
      firstDateYear === secondDateYear
    ) {
      setCurrentHeading(`${firstDateMonth} ${firstDateYear}`)
    } else if (
      firstDateMonth !== secondDateMonth &&
      firstDateYear === secondDateYear
    ) {
      setCurrentHeading(
        `${firstDateMonth} – ${secondDateMonth} ${firstDateYear}`
      )
    } else {
      setCurrentHeading(
        `${firstDateMonth} ${firstDateYear} – ${secondDateMonth} ${secondDateYear}`
      )
    }
  }, [$app.calendarState.range.value])

  return <span className={'sx__range-heading'}>{currentHeading}</span>
}

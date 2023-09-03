import { AppContext } from '../../utils/stateful/app-context'
import { useContext, useEffect, useState } from 'preact/compat'
import { DateRange } from '../../types/date-range'
import { InternalViewName } from '../../enums/internal-view.enum'
import {
  getMonthAndYearForSelectedDate,
  getMonthAndYearForDateRange,
} from '../../utils/stateless/range-heading'

export default function RangeHeading() {
  const $app = useContext(AppContext)

  const [currentHeading, setCurrentHeading] = useState<string>('' as string)

  useEffect(() => {
    if ($app.calendarState.view.value === InternalViewName.Week) {
      setCurrentHeading(
        getMonthAndYearForDateRange(
          $app,
          ($app.calendarState.range.value as DateRange).start,
          ($app.calendarState.range.value as DateRange).end
        )
      )
    }

    if (
      $app.calendarState.view.value === InternalViewName.Month ||
      $app.calendarState.view.value === InternalViewName.Day
    ) {
      setCurrentHeading(getMonthAndYearForSelectedDate($app))
    }
  }, [$app.calendarState.range.value])

  return <span className={'sx__range-heading'}>{currentHeading}</span>
}

import { AppContext } from '../../utils/stateful/app-context'
import { useContext, useState } from 'preact/hooks'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import {
  getMonthAndYearForSelectedDate,
  getMonthAndYearForDateRange,
} from '../../utils/stateless/range-heading'
import { useSignalEffect } from '@preact/signals'

export default function RangeHeading() {
  const $app = useContext(AppContext)

  const [currentHeading, setCurrentHeading] = useState<string>('' as string)

  useSignalEffect(() => {
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
      $app.calendarState.view.value === InternalViewName.MonthGrid ||
      $app.calendarState.view.value === InternalViewName.Day ||
      $app.calendarState.view.value === InternalViewName.MonthAgenda
    ) {
      setCurrentHeading(getMonthAndYearForSelectedDate($app))
    }
  })

  return <span className={'sx__range-heading'}>{currentHeading}</span>
}

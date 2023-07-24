import { WeekWithDates } from '../../../../shared/types/time'
import { DATE_PICKER_WEEK } from '../constants/test-ids'

type props = {
  week: WeekWithDates
}

export default function MonthViewWeek({ week }: props) {
  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} class="sx__date-picker__week">
        {week.map((day) => (
          <span>{day.getDate()}</span>
        ))}
      </div>
    </>
  )
}

import { WeekWithDates } from '../../../../shared/types/time'
import { DATE_PICKER_WEEK } from '../constants/test-ids'
import { useContext } from "preact/compat";
import { AppContext } from "../utils/stateful/app-context";
import { toDateString } from "../../../../shared/utils/stateless/time/format-conversion/date-to-strings";

type props = {
  week: WeekWithDates
}

export default function MonthViewWeek({ week }: props) {
  const $app = useContext(AppContext)

  const selectDate = (date: Date) => {
    $app.datePickerState.selectedDate.value = toDateString(date)
    $app.datePickerState.close()
  }

  return (
    <>
      <div data-testid={DATE_PICKER_WEEK} class="sx__date-picker__week">
        {week.map((day) => (
          <button
            class="sx__date-picker__day"
            onClick={() => selectDate(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </>
  )
}

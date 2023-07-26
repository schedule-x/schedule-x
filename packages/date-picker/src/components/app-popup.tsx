import { useState } from 'preact/compat'
import { DatePickerView } from '../enums/date-picker-view.enum'
import MonthView from './month-view'
import YearsView from './years-view'

export default function AppPopup() {
  const [datePickerView, setDatePickerView] = useState<DatePickerView>(
    DatePickerView.MONTH_DAYS
  )

  return (
    <>
      <div data-testid="date-picker-popup" class="sx__date-picker-popup">
        {datePickerView === DatePickerView.MONTH_DAYS ? (
          <MonthView
            seatYearsView={() => setDatePickerView(DatePickerView.YEARS)}
          />
        ) : (
          <YearsView
            setMonthView={() => setDatePickerView(DatePickerView.MONTH_DAYS)}
          />
        )}
      </div>
    </>
  )
}

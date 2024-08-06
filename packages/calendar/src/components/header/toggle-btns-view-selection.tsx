import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

export const ToggleBtnsViewSelection = () => {
  const $app = useContext(AppContext)

  const handleChangeTimeFrame = (
    timeframe: 'day' | 'week' | 'month-grid' | 'month-agenda'
  ) => {
    $app.calendarState.setView(
      timeframe,
      $app.datePickerState.selectedDate.value
    )
  }

  return (
    <div className="time-frame-buttons">
      <button
        className={`time-frame-button ${$app.calendarState.view.value === 'day' ? 'active' : ''}`}
        onClick={() => handleChangeTimeFrame('day')}
      >
        {$app.translate('Day')}
      </button>
      <button
        className={`time-frame-button ${$app.calendarState.view.value === 'week' ? 'active' : ''}`}
        onClick={() => handleChangeTimeFrame('week')}
      >
        {$app.translate('Week')}
      </button>
      <button
        className={`time-frame-button ${[InternalViewName.MonthAgenda, InternalViewName.MonthGrid].includes($app.calendarState.view.value as InternalViewName) ? 'active' : ''}`}
        onClick={() =>
          handleChangeTimeFrame(
            $app.calendarState.isCalendarSmall.value
              ? 'month-agenda'
              : 'month-grid'
          )
        }
      >
        {$app.translate('Month')}
      </button>
    </div>
  )
}

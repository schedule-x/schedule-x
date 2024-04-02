import { useContext, useEffect, useState } from 'preact/hooks'
import { DatePickerView } from '@schedule-x/shared/src/interfaces/date-picker/date-picker-view.enum'
import MonthView from './month-view'
import YearsView from './years-view'
import { AppContext } from '../utils/stateful/app-context'

const POPUP_CLASS_NAME = 'sx__date-picker-popup'

export default function AppPopup() {
  const $app = useContext(AppContext)

  const [datePickerView, setDatePickerView] = useState<DatePickerView>(
    DatePickerView.MONTH_DAYS
  )

  const popupClasses = [POPUP_CLASS_NAME, $app.config.placement]

  const clickOutsideListener = (event: Event) => {
    const target = event.target as HTMLElement

    if (!target.closest(`.${POPUP_CLASS_NAME}`)) $app.datePickerState.close()
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  const remSize: number = Number(
    getComputedStyle(document.documentElement).fontSize.split('px')[0]
  )
  const popupHeight = 362
  const popupWidth = 332

  const fixedPositionStyle = {
    top: $app.config.placement.includes('bottom')
      ? $app.datePickerState.inputRect.value.height +
        $app.datePickerState.inputRect.value.y +
        1
      : $app.datePickerState.inputRect.value.y - remSize - popupHeight,
    left: $app.config.placement.includes('start')
      ? $app.datePickerState.inputRect.value.x
      : $app.datePickerState.inputRect.value.x +
        $app.datePickerState.inputRect.value.width -
        popupWidth,
    width: popupWidth,
    position: 'fixed',
  }

  return (
    <>
      <div
        style={$app.config.teleportTo ? fixedPositionStyle : undefined}
        data-testid="date-picker-popup"
        className={popupClasses.join(' ')}
      >
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

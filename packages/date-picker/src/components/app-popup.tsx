import { useContext, useEffect, useState } from 'preact/compat'
import { DatePickerView } from '../enums/date-picker-view.enum'
import MonthView from './month-view'
import YearsView from './years-view'
import { AppContext } from '../utils/stateful/app-context'
import { Placement } from '../enums/placement.enum'

const POPUP_CLASS_NAME = 'sx__date-picker-popup'

export default function AppPopup() {
  const $app = useContext(AppContext)

  const [datePickerView, setDatePickerView] = useState<DatePickerView>(
    DatePickerView.MONTH_DAYS
  )

  const inputElement = document.querySelector('.sx__date-input') as HTMLInputElement
  const inputDomRect = inputElement?.getBoundingClientRect()
  const POPUP_MAX_HEIGHT = 400
  const POPUP_WIDTH = 300
  const spaceToWindowBottom = window.innerHeight - inputDomRect.bottom
  const spaceToWindowTop = inputDomRect.top
  const spaceToWindowLeft = inputDomRect.left
  const spaceToWindowRight = window.innerWidth - inputDomRect.right

  const shouldPositionBelow = spaceToWindowBottom >= POPUP_MAX_HEIGHT || spaceToWindowBottom >= spaceToWindowTop
  const shouldPositionToRight = spaceToWindowRight >= POPUP_WIDTH || spaceToWindowRight >= spaceToWindowLeft
  const shouldPositionToTop = !shouldPositionBelow

  if (shouldPositionBelow && shouldPositionToRight) {
    $app.config.placement = Placement.BOTTOM_START
  } else if (shouldPositionBelow) {
    $app.config.placement = Placement.BOTTOM_END
  } else if (shouldPositionToTop && shouldPositionToRight) {
    $app.config.placement = Placement.TOP_START
  } else {
    $app.config.placement = Placement.TOP_END
  }


  const popupClasses = [POPUP_CLASS_NAME, $app.config.placement]

  const clickOutsideListener = (event: Event) => {
    const target = event.target as HTMLElement

    if (!target.closest(`.${POPUP_CLASS_NAME}`)) $app.datePickerState.close()
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  return (
    <>
      <div data-testid="date-picker-popup" class={popupClasses.join(' ')}>
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

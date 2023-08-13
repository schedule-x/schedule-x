import { useContext, useEffect, useState } from 'preact/compat'
import { DatePickerView } from '../enums/date-picker-view.enum'
import MonthView from './month-view'
import YearsView from './years-view'
import { AppContext } from '../utils/stateful/app-context'
import { Placement } from '../enums/placement.enum'

const POPUP_CLASS_NAME = 'sx__date-picker-popup'

function getDynamicPopupPlacement() {
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
    return Placement.BOTTOM_START
  } else if (shouldPositionBelow) {
    return Placement.BOTTOM_END
  } else if (shouldPositionToTop && shouldPositionToRight) {
    return Placement.TOP_START
  } else {
    return Placement.TOP_END
  }
}

export default function AppPopup() {
  const $app = useContext(AppContext)

  const [datePickerView, setDatePickerView] = useState<DatePickerView>(
    DatePickerView.MONTH_DAYS
  )

  let popupPlacement: Placement | undefined = $app.config.placement
  if (!popupPlacement) popupPlacement = getDynamicPopupPlacement()
  const popupClasses = [POPUP_CLASS_NAME, popupPlacement]

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

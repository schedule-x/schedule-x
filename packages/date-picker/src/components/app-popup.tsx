import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import { DatePickerView } from '@schedule-x/shared/src/interfaces/date-picker/date-picker-view.enum'
import MonthView from './month-view'
import YearsView from './years-view'
import { AppContext } from '../utils/stateful/app-context'
import { getScrollableParents } from '@schedule-x/shared/src/utils/stateless/dom/scrolling'

const POPUP_CLASS_NAME = 'sx__date-picker-popup'

type Props = {
  wrapperEl: HTMLDivElement | null
}

export default function AppPopup({ wrapperEl }: Props) {
  const $app = useContext(AppContext)

  const [datePickerView, setDatePickerView] = useState<DatePickerView>(
    DatePickerView.MONTH_DAYS
  )

  const classList = useMemo(() => {
    const returnValue = [
      POPUP_CLASS_NAME,
      $app.datePickerState.isDark.value ? 'is-dark' : '',
      $app.config.teleportTo ? 'is-teleported' : '',
    ]
    if ($app.config.placement && !$app.config.teleportTo && wrapperEl) {
      const placement =
        typeof $app.config.placement === 'function'
          ? $app.config.placement(wrapperEl)
          : $app.config.placement
      returnValue.push(placement)
    }

    return returnValue
  }, [
    $app.datePickerState.isDark.value,
    $app.config.placement,
    $app.config.teleportTo,
  ])

  const clickOutsideListener = (event: Event) => {
    const target = event.target as HTMLElement

    if (!target.closest(`.${POPUP_CLASS_NAME}`)) $app.datePickerState.close()
  }

  const escapeKeyListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if ($app.config.listeners.onEscapeKeyDown)
        $app.config.listeners.onEscapeKeyDown($app)
      else $app.datePickerState.close()
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    document.addEventListener('keydown', escapeKeyListener)
    return () => {
      document.removeEventListener('click', clickOutsideListener)
      document.removeEventListener('keydown', escapeKeyListener)
    }
  }, [])

  const remSize: number = Number(
    getComputedStyle(document.documentElement).fontSize.split('px')[0]
  )
  const popupHeight = 362
  const popupWidth = 332

  const getFixedPositionStyles = () => {
    const inputWrapperEl = $app.datePickerState.inputWrapperElement.value
    const inputRect = inputWrapperEl?.getBoundingClientRect()
    if (inputWrapperEl === undefined || !(inputRect instanceof DOMRect))
      return undefined

    // const resolvedPlacement =
    //   typeof $app.config.placement === 'function'
    //     ? (wrapperEl ? $app.config.placement(wrapperEl) : undefined)
    //     : $app.config.placement

    // if (!resolvedPlacement) return undefined

    return {
      top: $app.config.placement.includes('bottom')
        ? inputRect.height + inputRect.y + 1 // 1px border
        : inputRect.y - remSize - popupHeight, // subtract remsize to leave room for label text
      left: $app.config.placement.includes('start')
        ? inputRect.x
        : inputRect.x + inputRect.width - popupWidth,
      width: popupWidth,
      position: 'fixed',
    }
  }

  const [fixedPositionStyle, setFixedPositionStyle] = useState(
    getFixedPositionStyles()
  )

  useEffect(() => {
    const inputWrapper = $app.datePickerState.inputWrapperElement.value
    if (inputWrapper === undefined) return

    const scrollableParents = getScrollableParents(inputWrapper)
    const scrollListener = () => setFixedPositionStyle(getFixedPositionStyles())
    scrollableParents.forEach((parent) =>
      parent.addEventListener('scroll', scrollListener)
    )

    return () =>
      scrollableParents.forEach((parent) =>
        parent.removeEventListener('scroll', scrollListener)
      )
  }, [])

  return (
    <>
      <div
        style={$app.config.teleportTo ? fixedPositionStyle : undefined}
        data-testid="date-picker-popup"
        className={classList.join(' ')}
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

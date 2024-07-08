/* eslint-disable max-lines */
import TimeInput from './time-input'
import { AppContext } from '../utils/stateful/app-context'
import { useContext, useRef } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { getScrollableParents } from '@schedule-x/shared/src/utils/stateless/dom/scrolling'
import { convert12HourTo24HourTimeString } from '../utils/stateless/convert-time-strings'

export default function AppPopup() {
  const $app = useContext(AppContext)
  const POPUP_CLASS_NAME = 'sx__time-picker-popup'
  const INPUT_WRAPPER_CLASS_NAME = 'sx__time-input-wrapper'

  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)
  const OKButtonRef = useRef<HTMLButtonElement>(null)
  const [classList, setClassList] = useState([
    POPUP_CLASS_NAME,
    $app.config.placement,
  ])

  useEffect(() => {
    setClassList([
      POPUP_CLASS_NAME,
      $app.config.placement,
      $app.config.dark.value ? 'is-dark' : '',
    ])
  }, [$app.config.dark.value, $app.config.placement.value])

  const getInitialStart12Hour = (hours: string) => {
    const hoursInt = Number(hours)
    if (hoursInt === 0) return '12'
    if (hoursInt > 12) return String(hoursInt - 12)
    return hours
  }

  const [initialStart, initialEnd] =
    $app.timePickerState.currentTime.value.split(':')
  const [hoursValue, setHoursValue] = useState(
    $app.config.is12Hour.value
      ? getInitialStart12Hour(initialStart)
      : initialStart
  )
  const [minutesValue, setMinutesValue] = useState(initialEnd)

  const clickOutsideListener = (event: Event) => {
    const target = event.target as HTMLElement

    if (
      ![POPUP_CLASS_NAME, INPUT_WRAPPER_CLASS_NAME].some((className) =>
        target.closest(`.${className}`)
      )
    ) {
      $app.timePickerState.isOpen.value = false
    }
  }

  useEffect(() => {
    hoursRef.current?.focus()
    hoursRef.current?.select()
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  const handleAccept = () => {
    if ($app.config.is12Hour.value) {
      convert12HourTo24HourTimeString(hoursValue, minutesValue, $app)
    } else {
      $app.timePickerState.currentTime.value = `${hoursValue}:${minutesValue}`
    }

    $app.timePickerState.isOpen.value = false
  }

  const remSize: number = Number(
    getComputedStyle(document.documentElement).fontSize.split('px')[0]
  )
  const popupHeight = 362
  const popupWidth = 332

  const getFixedPositionStyles = () => {
    const inputRect =
      $app.timePickerState.inputWrapperElement.value?.getBoundingClientRect()
    if (!inputRect) return undefined

    return {
      top: $app.config.placement.value?.includes('bottom')
        ? inputRect.height + inputRect.y + 1 // 1px border
        : inputRect.y - remSize - popupHeight, // subtract remsize to leave room for label text
      left: $app.config.placement.value?.includes('start')
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
    const inputWrapperEl = $app.timePickerState.inputWrapperElement.value
    if (!inputWrapperEl) return

    const scrollableParents = getScrollableParents(inputWrapperEl)
    scrollableParents.forEach((parent) =>
      parent.addEventListener('scroll', () =>
        setFixedPositionStyle(getFixedPositionStyles())
      )
    )

    return () => {
      scrollableParents.forEach((parent) =>
        parent.removeEventListener('scroll', () =>
          setFixedPositionStyle(getFixedPositionStyles())
        )
      )
    }
  }, [])

  return (
    <div
      className={classList.join(' ')}
      style={$app.config.teleportTo.value ? fixedPositionStyle : undefined}
    >
      <div className="sx__time-picker-popup-label">Select time</div>

      <div className="sx__time-picker-time-inputs">
        <TimeInput
          initialValue={hoursValue}
          onChange={(newHours) => setHoursValue(newHours)}
          inputRef={hoursRef}
          nextTabIndexRef={minutesRef}
          validRange={$app.config.is12Hour.value ? [1, 12] : [0, 23]}
        />

        <span className="sx__time-picker-colon">:</span>

        <TimeInput
          initialValue={minutesValue}
          onChange={(newMinutes) => setMinutesValue(newMinutes)}
          inputRef={minutesRef}
          validRange={[0, 59]}
          nextTabIndexRef={OKButtonRef}
        />

        {$app.config.is12Hour.value && (
          <div className="sx__time-picker-12-hour-switches">
            <button
              className={`sx__time-picker-12-hour-switch${$app.timePickerState.isAM.value ? ' is-selected' : ''}`}
              onClick={() => ($app.timePickerState.isAM.value = true)}
            >
              AM
            </button>

            <button
              className={`sx__time-picker-12-hour-switch${!$app.timePickerState.isAM.value ? ' is-selected' : ''}`}
              onClick={() => ($app.timePickerState.isAM.value = false)}
            >
              PM
            </button>
          </div>
        )}
      </div>

      <div class="sx__time-picker-actions">
        <button
          class="sx__time-picker-action sx__ripple sx__button-cancel"
          onClick={() => ($app.timePickerState.isOpen.value = false)}
        >
          Cancel
        </button>

        <button
          ref={OKButtonRef}
          class="sx__time-picker-action sx__ripple sx__button-accept"
          onClick={handleAccept}
        >
          OK
        </button>
      </div>
    </div>
  )
}

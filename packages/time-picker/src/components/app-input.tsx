import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { useContext, useEffect } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { useState } from 'preact/hooks'

export default function AppInput() {
  const $app = useContext(AppContext)
  const inputId = randomStringId()
  const wrapperId = randomStringId()
  const [wrapperClasses, setWrapperClasses] = useState<string[]>([])

  useEffect(() => {
    const newClasses = ['sx__time-input-wrapper']
    if ($app.timePickerState.isOpen.value)
      newClasses.push('sx__time-input--active')
    setWrapperClasses(newClasses)
  }, [$app.timePickerState.isOpen.value])

  const openPopup = () => {
    $app.timePickerState.isOpen.value = true

    const inputRect = document
      .getElementById(wrapperId)
      ?.getBoundingClientRect()
    if (!(inputRect instanceof DOMRect)) return

    $app.timePickerState.inputRect.value = {
      x: inputRect.left + window.scrollX,
      y: inputRect.top + window.scrollY,
      height: inputRect.height,
      width: inputRect.width,
    }
  }

  return (
    <>
      <div id={wrapperId} className={wrapperClasses.join(' ')}>
        <label htmlFor={inputId} className="sx__time-input-label">
          Time
        </label>

        <input
          value={$app.timePickerState.currentTime.value}
          readOnly={true}
          id={inputId}
          className="sx__time-picker-input"
          type="text"
          onFocus={openPopup}
        />
      </div>
    </>
  )
}

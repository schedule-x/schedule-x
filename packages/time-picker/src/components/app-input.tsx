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
    if (!$app.config.teleportTo.value) {
      $app.timePickerState.isOpen.value = true
      return
    }

    const inputWrapperElement = document.getElementById(wrapperId)
    $app.timePickerState.inputWrapperElement.value =
      inputWrapperElement instanceof HTMLDivElement
        ? inputWrapperElement
        : undefined
    $app.timePickerState.isOpen.value = true
  }

  return (
    <>
      <div id={wrapperId} className={wrapperClasses.join(' ')}>
        <label htmlFor={inputId} className="sx__time-input-label">
          {$app.config.label.value ?? 'Time'}
        </label>

        <input
          value={$app.timePickerState.currentTimeDisplayedValue.value}
          readOnly={true}
          id={inputId}
          name={$app.config.name.value ? $app.config.name.value : 'time'}
          className="sx__time-picker-input"
          type="text"
          onFocus={openPopup}
        />
      </div>
    </>
  )
}

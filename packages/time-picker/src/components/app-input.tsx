import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { useContext, useEffect } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { useState } from 'preact/hooks'

export default function AppInput() {
  const $app = useContext(AppContext)
  const inputId = randomStringId()
  const [wrapperClasses, setWrapperClasses] = useState<string[]>([])

  useEffect(() => {
    const newClasses = ['sx__time-input-wrapper']
    if ($app.timePickerState.isOpen.value)
      newClasses.push('sx__time-input--active')
    setWrapperClasses(newClasses)
  }, [$app.timePickerState.isOpen.value])

  return (
    <>
      <div className={wrapperClasses.join(' ')}>
        <label htmlFor={inputId} className="sx__time-input-label">
          Time
        </label>

        <input
          value={$app.timePickerState.currentTime.value}
          readOnly={true}
          id={inputId}
          className="sx__time-picker-input"
          type="text"
          onFocus={() => ($app.timePickerState.isOpen.value = true)}
        />
      </div>
    </>
  )
}

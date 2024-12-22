import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toLocalizedDateString } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import chevronIcon from '../assets/chevron-input.svg'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { isKeyEnterOrSpace } from '@schedule-x/shared/src/utils/stateless/dom/events'

export default function AppInput() {
  const datePickerInputId = randomStringId()
  const datePickerLabelId = randomStringId()
  const inputWrapperId = randomStringId()
  const $app = useContext(AppContext)
  const getLocalizedDate = (dateString: string) => {
    if (dateString === '') return $app.translate('MM/DD/YYYY')
    return toLocalizedDateString(toJSDate(dateString), $app.config.locale.value)
  }

  useEffect(() => {
    $app.datePickerState.inputDisplayedValue.value = getLocalizedDate(
      $app.datePickerState.selectedDate.value
    )
  }, [$app.datePickerState.selectedDate.value, $app.config.locale.value])

  const [wrapperClasses, setWrapperClasses] = useState<string[]>([])

  const setInputElement = () => {
    const inputWrapperEl = document.getElementById(inputWrapperId)
    $app.datePickerState.inputWrapperElement.value =
      inputWrapperEl instanceof HTMLDivElement ? inputWrapperEl : undefined
  }

  useEffect(() => {
    if ($app.config.teleportTo) setInputElement()

    const newClasses = ['sx__date-input-wrapper']
    if ($app.datePickerState.isOpen.value)
      newClasses.push('sx__date-input--active')
    setWrapperClasses(newClasses)
  }, [$app.datePickerState.isOpen.value])

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') handleInputValue(event)
  }

  const handleInputValue = (event: Event) => {
    event.stopPropagation() // prevent date picker from closing

    try {
      $app.datePickerState.inputDisplayedValue.value = (
        event.target as HTMLInputElement
      ).value
      $app.datePickerState.close()
    } catch (e) {
      // nothing to do
    }
  }

  useEffect(() => {
    const inputElement = document.getElementById(datePickerInputId)
    if (inputElement === null) return

    inputElement.addEventListener('change', handleInputValue) // Preact onChange triggers on every input
    return () => inputElement.removeEventListener('change', handleInputValue)
  })

  const handleClick = (event: Event) => {
    handleInputValue(event)
    $app.datePickerState.open()
  }

  const handleButtonKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      keyboardEvent.preventDefault()
      $app.datePickerState.open()

      setTimeout(() => {
        const element = document.querySelector('[data-focus="true"]')
        if (element instanceof HTMLElement) element.focus()
      }, 50)
    }
  }

  return (
    <>
      <div className={wrapperClasses.join(' ')} id={inputWrapperId}>
        <label
          for={datePickerInputId}
          id={datePickerLabelId}
          className="sx__date-input-label"
        >
          {$app.config.label || $app.translate('Date')}
        </label>

        <input
          id={datePickerInputId}
          tabIndex={$app.datePickerState.isDisabled.value ? -1 : 0}
          name={$app.config.name || 'date'}
          aria-describedby={datePickerLabelId}
          value={$app.datePickerState.inputDisplayedValue.value}
          data-testid="date-picker-input"
          className="sx__date-input"
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          type="text"
        />

        <button
          type="button"
          tabIndex={$app.datePickerState.isDisabled.value ? -1 : 0}
          aria-label={$app.translate('Choose Date')}
          onKeyDown={handleButtonKeyDown}
          onClick={() => $app.datePickerState.open()}
          className="sx__date-input-chevron-wrapper"
        >
          <img className="sx__date-input-chevron" src={chevronIcon} alt="" />
        </button>
      </div>
    </>
  )
}

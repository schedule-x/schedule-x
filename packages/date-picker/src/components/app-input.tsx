import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import chevronIcon from '@schedule-x/shared/src/assets/chevron-input.svg'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { isKeyEnterOrSpace } from '@schedule-x/shared/src/utils/stateless/dom/events'
import { Placement } from '@schedule-x/shared/src/interfaces/date-picker/placement.enum'

export default function AppInput() {
  const datePickerInputId = randomStringId()
  const datePickerLabelId = randomStringId()
  const inputWrapperId = randomStringId()
  const $app = useContext(AppContext)

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
      $app.datePickerState.handleInput((event.target as HTMLInputElement).value)
      $app.datePickerState.close()
    } catch (e) {
      console.log('Error setting input value:' + e)
    }
  }

  useEffect(() => {
    const inputElement =
      typeof document !== 'undefined' &&
      document.getElementById(datePickerInputId)
    if (
      typeof HTMLElement === 'undefined' ||
      !(inputElement instanceof HTMLElement)
    )
      return

    inputElement.addEventListener('change', handleInputValue) // Preact onChange triggers on every input
    return () => inputElement.removeEventListener('change', handleInputValue)
  })

  useEffect(() => {
    if ($app.config.hasPlaceholder) {
      $app.datePickerState.inputDisplayedValue.value =
        $app.translate('MM/DD/YYYY')
    }
  }, [])

  function checkPosition(): void {
    const inputWrapperEl = document.getElementById(inputWrapperId)
    if (inputWrapperEl instanceof HTMLElement) {
      const rect = inputWrapperEl.getBoundingClientRect()
      const viewportCenterX = window.innerWidth / 2
      const isMoreOnLeftSide = rect.x + rect.width / 2 <= viewportCenterX
      const prefersTop = $app.config.placement?.includes('top')
      $app.config.placement = prefersTop
        ? isMoreOnLeftSide
          ? Placement.TOP_START
          : Placement.TOP_END
        : isMoreOnLeftSide
          ? Placement.BOTTOM_START
          : Placement.BOTTOM_END
    }
  }

  const handleClick = () => {
    checkPosition()
    $app.datePickerState.open()
  }

  const handleButtonKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      checkPosition()
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
          onClick={handleClick}
          className="sx__date-input-chevron-wrapper"
        >
          <img className="sx__date-input-chevron" src={chevronIcon} alt="" />
        </button>
      </div>
    </>
  )
}

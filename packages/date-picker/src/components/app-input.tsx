import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toLocalizedDateString } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import chevronIcon from '../assets/chevron-input.svg'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

export default function AppInput() {
  const datePickerLabelId = randomStringId()
  const $app = useContext(AppContext)
  const getLocalizedDate = (dateString: string) => {
    if (dateString === '') return $app.translate('MM/DD/YYYY')
    return toLocalizedDateString(toJSDate(dateString), $app.config.locale)
  }

  useEffect(() => {
    $app.datePickerState.inputDisplayedValue.value = getLocalizedDate(
      $app.datePickerState.selectedDate.value
    )
  }, [$app.datePickerState.selectedDate.value])

  const [wrapperClasses, setWrapperClasses] = useState<string[]>([])

  useEffect(() => {
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
    document.addEventListener('change', handleInputValue) // Preact onChange triggers on every input
    return () => document.removeEventListener('change', handleInputValue)
  })

  const handleClick = (event: Event) => {
    handleInputValue(event)
    $app.datePickerState.open()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      $app.datePickerState.open()

      setTimeout(() => {
        // focus the element that has data-focus attribute
        const element = document.querySelector('[data-focus="true"]')
        if (element) {
          console.log('focus button')
          ;(element as HTMLButtonElement).focus()
        }
      }, 50)
    }
  }

  return (
    <>
      <div className={wrapperClasses.join(' ')}>
        <label id={datePickerLabelId} className="sx__date-input-label">
          {$app.translate('Date')}
        </label>

        <input
          aria-describedby={datePickerLabelId}
          value={$app.datePickerState.inputDisplayedValue.value}
          data-testid="date-picker-input"
          className="sx__date-input"
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          type="text"
        />

        <button
          onKeyDown={handleKeyDown}
          className="sx__date-input-chevron-wrapper"
        >
          <img className="sx__date-input-chevron" src={chevronIcon} alt="" />
        </button>
      </div>
    </>
  )
}

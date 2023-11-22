import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toLocalizedDateString } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import chevronIcon from '../assets/chevron-input.svg'

export default function AppInput() {
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

  return (
    <>
      <div class={wrapperClasses.join(' ')}>
        <label class="sx__date-input-label">{$app.translate('Date')}</label>

        <input
          value={$app.datePickerState.inputDisplayedValue.value}
          data-testid="date-picker-input"
          class="sx__date-input"
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          type="text"
        />

        <img class="sx__date-input-chevron" src={chevronIcon} alt="" />
      </div>
    </>
  )
}

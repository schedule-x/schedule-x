import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { toLocalizedDateString } from '../../../../shared/utils/stateless/time/date-time-localization/date-time-localization'
import chevronIcon from '../assets/chevron-input.svg'
import { toDateString } from '../../../../shared/utils/stateless/time/format-conversion/date-format/to-date-string'

export default function AppInput() {
  const $app = useContext(AppContext)
  const getLocalizedDate = (dateString: string) => {
    return toLocalizedDateString(toJSDate(dateString), $app.config.locale)
  }

  const [displayedValue, setDisplayedValue] = useState<string>(
    getLocalizedDate($app.datePickerState.selectedDate.value)
  )

  useEffect(() => {
    setDisplayedValue(getLocalizedDate($app.datePickerState.selectedDate.value))
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
    event.stopPropagation()
    const input = event.target as HTMLInputElement

    try {
      const newSelectedDate = toDateString(
        input.value,
        $app.config.locale
      ) as string
      $app.datePickerState.selectedDate.value = newSelectedDate
      $app.datePickerState.datePickerDate.value = newSelectedDate
      $app.datePickerState.close()
    } catch (e) {
      // nothing to do
    }
  }

  useEffect(() => {
    document.addEventListener('change', handleInputValue)
    return () => document.removeEventListener('change', handleInputValue)
  })

  return (
    <>
      <div class={wrapperClasses.join(' ')}>
        <label class="sx__date-input-label">Date</label>

        <input
          value={displayedValue}
          data-testid="date-picker-input"
          class="sx__date-input"
          onClick={() => $app.datePickerState.toggle()}
          onKeyUp={handleKeyUp}
          type="text"
        />

        <img class="sx__date-input-chevron" src={chevronIcon} alt="" />
      </div>
    </>
  )
}

import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../utils/stateful/app-context'
import { toJSDate } from '../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { toLocalizedDate } from '../../../../shared/utils/stateless/time/date-time-localization/date-time-localization'
import chevronIcon from '../assets/chevron-down.svg'

export default function AppInput() {
  const $app = useContext(AppContext)
  const getLocalizedDate = (dateString: string) => {
    return toLocalizedDate(toJSDate(dateString), $app.config.locale)
  }

  const [displayedValue, setDisplayedValue] = useState<string>(
    getLocalizedDate($app.datePickerState.selectedDate.value)
  )

  useEffect(() => {
    setDisplayedValue(getLocalizedDate($app.datePickerState.selectedDate.value))
  }, [$app.datePickerState.selectedDate.value])

  const [wrapperClasses, setWrapperClasses] = useState<string[]>([

  ])

  useEffect(() => {
    setWrapperClasses([
      'sx__date-input-wrapper',
      $app.datePickerState.isOpen.value ? 'sx__date-input--active' : ''
    ])
  }, [$app.datePickerState.isOpen.value])

  return (
    <>
      <div class={wrapperClasses.join(' ')}>
        <label class="sx__date-input-label">Date</label>

        <input
          value={displayedValue}
          data-testid="date-picker-input"
          readonly
          class="sx__date-input"
          onClick={() => $app.datePickerState.toggle()}
          type="text"
        />

        <img
          class="sx__date-input-chevron"
          src={chevronIcon}
        />
      </div>
    </>
  )
}

import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import Chevron from '@schedule-x/shared/src/components/buttons/chevron'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'

export default function ForwardBackwardNavigation() {
  const $app = useContext(AppContext)

  const navigate = (direction: 'forwards' | 'backwards') => {
    const currentView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!currentView) return

    $app.datePickerState.selectedDate.value = currentView.backwardForwardFn(
      $app.datePickerState.selectedDate.value,
      direction === 'forwards'
        ? currentView.backwardForwardUnits
        : -currentView.backwardForwardUnits
    )
  }

  const [localizedRange, setLocalizedRange] = useState('')
  useEffect(() => {
    const localizedStart = toJSDate(
      $app.calendarState.range.value?.start || ''
    ).toLocaleDateString()
    const localizedEnd = toJSDate(
      $app.calendarState.range.value?.end || ''
    ).toLocaleDateString()
    setLocalizedRange(`${localizedStart} bis ${localizedEnd}`)
  }, [$app.calendarState.range.value])

  return (
    <>
      <div aria-label={localizedRange} aria-live="assertive">
        <Chevron
          onClick={() => navigate('backwards')}
          direction={'previous'}
          buttonText={$app.translate('Previous period')}
        />

        <Chevron
          onClick={() => navigate('forwards')}
          direction={'next'}
          buttonText={$app.translate('Next period')}
        />
      </div>
    </>
  )
}

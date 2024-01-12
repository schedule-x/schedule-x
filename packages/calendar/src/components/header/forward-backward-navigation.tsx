import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import Chevron from '@schedule-x/shared/src/components/buttons/chevron'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { CalendarAppSingleton } from '@schedule-x/shared'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'

function getLocalizedDateTime($app: CalendarAppSingleton) {
  return toJSDate($app.calendarState.range.value?.end || '').toLocaleDateString(
    $app.config.locale
  )
}

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
    setLocalizedRange(
      `${getLocalizedDate(
        $app.calendarState.range.value!.start,
        $app.config.locale
      )} ${$app.translate('to')} ${getLocalizedDate(
        $app.calendarState.range.value!.end,
        $app.config.locale
      )}`
    )
  }, [$app.calendarState.range.value])

  return (
    <>
      <div
        className="sx__forward-backward-navigation"
        aria-label={localizedRange}
        aria-live="polite"
      >
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

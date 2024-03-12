import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import Chevron from '@schedule-x/shared/src/components/buttons/chevron'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { View } from '@schedule-x/shared'

export default function ForwardBackwardNavigation() {
  const $app = useContext(AppContext)

  const getDateToNavigateTo = (
    direction: 'forwards' | 'backwards',
    currentView: View
  ) => {
    return currentView.backwardForwardFn(
      $app.datePickerState.selectedDate.value,
      direction === 'forwards'
        ? currentView.backwardForwardUnits
        : -currentView.backwardForwardUnits
    )
  }

  const navigate = (direction: 'forwards' | 'backwards') => {
    const currentView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!currentView) return

    $app.datePickerState.selectedDate.value = getDateToNavigateTo(
      direction,
      currentView
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

  const [previousMinusOne, setPreviousMinusOne] = useState('')
  const [nextPlusOne, setNextPlusOne] = useState('')

  useEffect(() => {
    const selectedView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!selectedView) return

    setPreviousMinusOne(getDateToNavigateTo('backwards', selectedView))
    setNextPlusOne(getDateToNavigateTo('forwards', selectedView))
  }, [$app.datePickerState.selectedDate.value, $app.calendarState.view.value])

  return (
    <>
      <div
        className="sx__forward-backward-navigation"
        aria-label={localizedRange}
        aria-live="polite"
      >
        <Chevron
          disabled={
            !!($app.config.minDate && previousMinusOne < $app.config.minDate)
          }
          onClick={() => navigate('backwards')}
          direction={'previous'}
          buttonText={$app.translate('Previous period')}
        />

        <Chevron
          disabled={
            !!($app.config.maxDate && nextPlusOne > $app.config.maxDate)
          }
          onClick={() => navigate('forwards')}
          direction={'next'}
          buttonText={$app.translate('Next period')}
        />
      </div>
    </>
  )
}

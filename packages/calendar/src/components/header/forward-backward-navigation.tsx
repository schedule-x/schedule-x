import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import Chevron from '@schedule-x/shared/src/components/buttons/chevron'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { useSignalEffect } from '@preact/signals'
import { Temporal } from 'temporal-polyfill'

export default function ForwardBackwardNavigation() {
  const $app = useContext(AppContext)

  const navigate = (direction: 'forwards' | 'backwards') => {
    const currentView = $app.config.views.value.find(
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
  useSignalEffect(() => {
    setLocalizedRange(
      `${getLocalizedDate(
        $app.calendarState.range.value!.start,
        $app.config.locale.value
      )} ${$app.translate('to')} ${getLocalizedDate(
        $app.calendarState.range.value!.end,
        $app.config.locale.value
      )}`
    )
  })

  const [rangeEndMinusOneRange, setRangeEndMinusOneRange] = useState<Temporal.ZonedDateTime | null>(null)
  const [rangeStartPlusOneRange, setRangeStartPlusOneRange] = useState<Temporal.ZonedDateTime | null>(null)

  useEffect(() => {
    const selectedView = $app.config.views.value.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!selectedView) return

    console.log('datepicker state', $app.datePickerState.selectedDate.value)

    setRangeEndMinusOneRange(
      selectedView.setDateRange({
        range: $app.calendarState.range,
        calendarConfig: $app.config,
        timeUnitsImpl: $app.timeUnitsImpl,
        date: selectedView.backwardForwardFn(
          $app.datePickerState.selectedDate.value,
          -selectedView.backwardForwardUnits
        ),
      }).end
    )
    setRangeStartPlusOneRange(
      selectedView.setDateRange({
        range: $app.calendarState.range,
        calendarConfig: $app.config,
        timeUnitsImpl: $app.timeUnitsImpl,
        date: selectedView.backwardForwardFn(
          $app.datePickerState.selectedDate.value,
          selectedView.backwardForwardUnits
        ),
      }).start
    )
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
            !!(
              $app.config.minDate.value &&
              dateFromDateTime(rangeEndMinusOneRange) <
                $app.config.minDate.value
            )
          }
          onClick={() => navigate('backwards')}
          direction={'previous'}
          buttonText={$app.translate('Previous period')}
        />

        <Chevron
          disabled={
            !!(
              $app.config.maxDate.value &&
              dateFromDateTime(rangeStartPlusOneRange) >
                $app.config.maxDate.value
            )
          }
          onClick={() => navigate('forwards')}
          direction={'next'}
          buttonText={$app.translate('Next period')}
        />
      </div>
    </>
  )
}

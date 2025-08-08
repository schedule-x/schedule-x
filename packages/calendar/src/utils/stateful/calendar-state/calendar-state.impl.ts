import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { batch, computed, effect, Signal, signal } from '@preact/signals'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import EventColors from '../event-colors/event-colors'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits,
  selectedDate?: Temporal.PlainDate
): CalendarState => {
  const _view = signal<ViewName>(
    calendarConfig.views.value.find(
      (view) => view.name === calendarConfig.defaultView
    )?.name || calendarConfig.views.value[0].name
  )
  const view = computed(() => {
    return _view.value
  })
  const range = signal<DateRange | null>(null)

  let wasInitialized = false
  let lastRangeEmitted__NEEDED_TO_PREVENT_RECURSION_IN_EVENT_RECURRENCE_PACKAGE_WHICH_CAUSES_RANGE_TO_UPDATE_AND_THUS_CAUSES_A_CYCLE: DateRange | null =
    null

  const callOnRangeUpdate = (_range: Signal<DateRange | null>) => {
    const lastRange =
      lastRangeEmitted__NEEDED_TO_PREVENT_RECURSION_IN_EVENT_RECURRENCE_PACKAGE_WHICH_CAUSES_RANGE_TO_UPDATE_AND_THUS_CAUSES_A_CYCLE
    if (!_range.value) return
    if (
      lastRange?.start.toString() === _range.value.start.toString() &&
      lastRange?.end.toString() === _range.value.end.toString()
    )
      return

    if (!wasInitialized) return (wasInitialized = true)

    if (calendarConfig.callbacks.onRangeUpdate && _range.value) {
      calendarConfig.callbacks.onRangeUpdate(_range.value)
    }
    
    Object.values(calendarConfig.plugins || {}).forEach((plugin) => {
      plugin?.onRangeUpdate?.(_range.value!)
      lastRangeEmitted__NEEDED_TO_PREVENT_RECURSION_IN_EVENT_RECURRENCE_PACKAGE_WHICH_CAUSES_RANGE_TO_UPDATE_AND_THUS_CAUSES_A_CYCLE =
        _range.value
    })
  }

  effect(() => {
    if (range.value) {
      callOnRangeUpdate(range)
    }
  })

  const setRange = (date: Temporal.PlainDate) => {
    const selectedView = calendarConfig.views.value.find(
      (availableView) => availableView.name === _view.value
    )
    const newRange = (selectedView as View).setDateRange({
      calendarConfig,
      date,
      range,
      timeUnitsImpl,
    })
    if (
      newRange.start.toString() === range.value?.start.toString() &&
      newRange.end.toString() === range.value?.end.toString()
    )
      return

    range.value = newRange
  }

  // one initial call for setting the range
  setRange(selectedDate || Temporal.PlainDate.from(Temporal.Now.plainDateISO()))

  const isCalendarSmall = signal<boolean | undefined>(undefined)
  const isDark = signal<boolean>(calendarConfig.isDark.value || false)

  effect(() => {
    const eventColors = new EventColors(calendarConfig)
    if (isDark.value) {
      eventColors.setDark()
    } else {
      eventColors.setLight()
    }
  })

  return {
    view,
    isDark,
    setRange,
    range,
    isCalendarSmall,
    setView: (newView: ViewName, selectedDate: Temporal.PlainDate) => {
      batch(() => {
        _view.value = newView
        setRange(selectedDate)
      })
    },
  }
}

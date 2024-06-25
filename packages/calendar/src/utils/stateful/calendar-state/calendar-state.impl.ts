import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { computed, effect, Signal, signal } from '@preact/signals'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import EventColors from '../event-colors/event-colors'
import { toDateString } from '@schedule-x/shared/src'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits,
  selectedDate?: string
): CalendarState => {
  const _view = signal<ViewName>(
    calendarConfig.views.find(
      (view) => view.name === calendarConfig.defaultView
    )?.name || calendarConfig.views[0].name
  )
  const view = computed(() => {
    return _view.value
  })
  const range = signal<DateRange | null>(null)

  let wasInitialized = false
  const callOnRangeUpdate = (_range: Signal<DateRange | null>) => {
    if (!wasInitialized) return (wasInitialized = true)

    if (calendarConfig.callbacks.onRangeUpdate && _range.value) {
      calendarConfig.callbacks.onRangeUpdate(_range.value)
    }
  }

  effect(() => {
    if (calendarConfig.callbacks.onRangeUpdate && range.value) {
      callOnRangeUpdate(range)
    }
  })

  const setRange = (date: string) => {
    const selectedView = calendarConfig.views.find(
      (availableView) => availableView.name === _view.value
    )
    const newRange = (selectedView as View).setDateRange({
      calendarConfig,
      date,
      range,
      timeUnitsImpl,
    })
    if (
      newRange.start === range.value?.start &&
      newRange.end === range.value?.end
    )
      return

    range.value = newRange
  }

  // one initial call for setting the range
  setRange(selectedDate || toDateString(new Date()))

  const isCalendarSmall = signal<boolean | undefined>(undefined)
  const isDark = signal<boolean>(calendarConfig.isDark || false)

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
    setView: (newView: ViewName, selectedDate: string) => {
      _view.value = newView
      setRange(selectedDate)
    },
  }
}

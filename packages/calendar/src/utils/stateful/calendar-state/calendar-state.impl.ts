import CalendarState from '@schedule-x/shared/src/interfaces/calendar/calendar-state.interface'
import { effect, Signal, signal } from '@preact/signals'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import CalendarConfigInternal from '@schedule-x/shared/src/interfaces/calendar/calendar-config'
import TimeUnits from '@schedule-x/shared/src/utils/stateful/time-units/time-units.interface'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import EventColors from '../event-colors/event-colors'

export const createCalendarState = (
  calendarConfig: CalendarConfigInternal,
  timeUnitsImpl: TimeUnits
): CalendarState => {
  const view = signal<ViewName>(
    calendarConfig.views.find(
      (view) => view.name === calendarConfig.defaultView
    )?.name || calendarConfig.views[0].name
  )
  const range = signal<DateRange | null>(null)

  let wasInitialized = false

  const callOnRangeUpdate = (_range: Signal<DateRange | null>) => {
    // On the first call of this function (upon initializing the calendar), we don't want to call the callback.
    // This is dirty. If a better way is found, please change this.
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

  const handleDateSelection = (date: string) => {
    const selectedView = calendarConfig.views.find(
      (availableView) => availableView.name === view.value
    )
    range.value = (selectedView as View).setDateRange({
      calendarConfig,
      date,
      range,
      timeUnitsImpl,
    })
  }

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
    isDark,
    view,
    handleDateSelection,
    range,
    isCalendarSmall,
  }
}

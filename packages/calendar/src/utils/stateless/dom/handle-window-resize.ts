import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { View } from '@schedule-x/shared/src/types/calendar/view'

const setScreenSizeCompatibleView = (
  $app: CalendarAppSingleton,
  isSmall: boolean
) => {
  const currentView = $app.config.views.value.find(
    (view) => view.name === $app.calendarState.view.value
  ) as View
  if (isSmall) {
    if (currentView.hasSmallScreenCompat) return

    const smallScreenCompatibleView = $app.config.views.value.find(
      (view) => view.hasSmallScreenCompat
    )
    if (smallScreenCompatibleView) {
      $app.calendarState.setView(
        smallScreenCompatibleView.name,
        $app.datePickerState.selectedDate.value
      )
    }
  } else {
    if (currentView.hasWideScreenCompat) return

    const wideScreenCompatibleView = $app.config.views.value.find(
      (view) => view.hasWideScreenCompat
    )
    if (wideScreenCompatibleView) {
      $app.calendarState.setView(
        wideScreenCompatibleView.name,
        $app.datePickerState.selectedDate.value
      )
    }
  }
}

export const handleWindowResize = ($app: CalendarAppSingleton) => {
  const documentRoot = document.documentElement
  const calendarRoot = $app.elements.calendarWrapper
  const documentFontSize = +window
    .getComputedStyle(documentRoot)
    .fontSize.split('p')[0]
  const breakPointFor1RemEquals16px = 700
  const multiplier = 16 / documentFontSize
  const smallCalendarBreakpoint = breakPointFor1RemEquals16px / multiplier // For 16px root font-size, break point is at 43.75rem

  if (!calendarRoot) return

  const isSmall = $app.config.callbacks.isCalendarSmall
    ? $app.config.callbacks.isCalendarSmall($app)
    : calendarRoot.clientWidth < smallCalendarBreakpoint
  const didIsSmallScreenChange =
    isSmall !== $app.calendarState.isCalendarSmall.value
  if (!didIsSmallScreenChange) return

  $app.calendarState.isCalendarSmall.value = isSmall
  setScreenSizeCompatibleView($app, isSmall)
}

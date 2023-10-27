import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const setIsSmallScreen = ($app: CalendarAppSingleton) => {
  const documentRoot = document.documentElement
  const calendarRoot = $app.elements.calendarWrapper
  const documentFontSize = +window
    .getComputedStyle(documentRoot)
    .fontSize.split('p')[0]
  const breakPointFor1RemEquals16px = 700
  const multiplier = 16 / documentFontSize
  const smallCalendarBreakpoint = breakPointFor1RemEquals16px / multiplier // For 16px root font-size, break point is at 43.75rem

  if (!calendarRoot) return

  $app.calendarState.isSmallScreen.value =
    calendarRoot.clientWidth < smallCalendarBreakpoint
}

import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const setWrapperElement = ($app: CalendarAppSingleton) => {
  $app.elements.calendarWrapper = document.querySelector(
    '.sx__calendar-wrapper'
  ) as HTMLDivElement
}

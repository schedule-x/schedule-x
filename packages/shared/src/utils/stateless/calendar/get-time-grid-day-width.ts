import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const getTimeGridDayWidth = ($app: CalendarAppSingleton) => {
  return (
    ($app.elements.calendarWrapper as HTMLElement).querySelector(
      '.sx__time-grid-day'
    ) as HTMLDivElement
  ).clientWidth
}

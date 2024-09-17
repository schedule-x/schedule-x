import CalendarAppSingleton from '../../../interfaces/calendar/calendar-app-singleton'

export const getTimePointsPerPixel = ($app: CalendarAppSingleton): number => {
  return $app.config.timePointsPerDay / $app.config.weekOptions.value.gridHeight
}

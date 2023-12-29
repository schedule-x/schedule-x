import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

export const getClickDateTime = (
  e: MouseEvent,
  $app: CalendarAppSingleton,
  dayStartDateTime: string
) => {
  if (!(e.target instanceof HTMLElement)) return

  const clientY = e.clientY - e.target.getBoundingClientRect().top
  const clickPercentageOfDay =
    (clientY / e.target.getBoundingClientRect().height) * 100
  const clickTimePointsIntoDay = Math.round(
    ($app.config.timePointsPerDay / 100) * clickPercentageOfDay
  )

  return addTimePointsToDateTime(dayStartDateTime, clickTimePointsIntoDay)
}

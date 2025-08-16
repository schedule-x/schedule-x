import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

export const getClickDateTime = (
  e: MouseEvent,
  $app: CalendarAppSingleton,
  dayStartDateTime: Temporal.ZonedDateTime
) => {
  if (!(e.target instanceof HTMLElement)) return

  const DAY_GRID_CLASS_NAME = 'sx__time-grid-day'
  const dayGridElement = e.target.classList.contains(DAY_GRID_CLASS_NAME)
    ? e.target
    : (e.target.closest('.' + DAY_GRID_CLASS_NAME) as HTMLDivElement)

  const clientY = e.clientY - dayGridElement.getBoundingClientRect().top
  const clickPercentageOfDay =
    (clientY / dayGridElement.getBoundingClientRect().height) * 100
  const clickTimePointsIntoDay = Math.round(
    ($app.config.timePointsPerDay / 100) * clickPercentageOfDay
  )

  return addTimePointsToDateTime(dayStartDateTime, clickTimePointsIntoDay)
}

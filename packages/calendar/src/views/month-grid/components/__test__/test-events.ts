import CalendarEventBuilder from '../../../../../../shared/src/utils/stateless/calendar/calendar-event/calendar-event.builder'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

export const getTestEvent = ($app: CalendarAppSingleton) => {
  return new CalendarEventBuilder(
    $app.config,
    randomStringId(),
    Temporal.ZonedDateTime.from('2020-01-01T00:00:00.00+00:00[UTC]'),
    Temporal.ZonedDateTime.from('2020-01-01T23:59:00.00+00:00[UTC]')
  ).build()
}

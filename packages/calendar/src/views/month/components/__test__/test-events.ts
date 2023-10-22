import CalendarEventBuilder from '../../../../utils/stateful/calendar-event/calendar-event.builder'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'

export const getTestEvent = ($app: CalendarAppSingleton) => {
  return new CalendarEventBuilder($app.config, randomStringId(), {
    start: '2020-01-01 00:00',
    end: '2020-01-01 23:59',
  }).build()
}

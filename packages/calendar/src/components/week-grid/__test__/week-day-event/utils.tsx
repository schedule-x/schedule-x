import CalendarAppSingleton from '../../../../utils/stateful/app-singleton/calendar-app-singleton'
import { CalendarEventInternal } from '../../../../utils/stateful/calendar-event/calendar-event.interface'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import WeekDayEvent from '../../week-day-event'

export const factory = (
  $app: CalendarAppSingleton,
  calendarEvent: CalendarEventInternal
) => {
  render(
    <AppContext.Provider value={$app}>
      <WeekDayEvent calendarEvent={calendarEvent} timePoints={2400} />
    </AppContext.Provider>
  )
}

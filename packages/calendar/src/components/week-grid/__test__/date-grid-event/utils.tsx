import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import DateGridEvent from '../../date-grid-event'

export const renderComponent = (
  $app: CalendarAppSingleton,
  eventId: string,
  nDaysInGrid: number
) => {
  const calendarEvent = $app.calendarEvents.list.value.find(
    (event) => event.id === eventId
  ) as CalendarEventInternal
  calendarEvent._nDaysInGrid = nDaysInGrid

  render(
    <AppContext.Provider value={$app}>
      <DateGridEvent calendarEvent={calendarEvent} gridRow={1} />
    </AppContext.Provider>
  )
}
export const getEventByText = (text: string) => {
  return screen.getByText(text).closest('.sx__date-grid-event') as HTMLElement
}
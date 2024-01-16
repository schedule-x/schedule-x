import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'
import { EventCoordinates } from '../shared/event-coordinates'

export default interface DragHandlerDependencies {
  $app: CalendarAppSingleton
  eventCoordinates: EventCoordinates
  eventCopy: CalendarEventInternal
  updateCopy: (newCopy: CalendarEventInternal | undefined) => void
}

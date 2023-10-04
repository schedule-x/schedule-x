import CalendarAppSingleton from '../calendar/calendar-app-singleton'
import { CalendarEventInternal } from '../calendar/calendar-event.interface'

export default interface DragHandlerDependencies {
  $app: CalendarAppSingleton
  event: MouseEvent
  eventCopy: CalendarEventInternal
  updateCopy: (newCopy: CalendarEventInternal | undefined) => void
}

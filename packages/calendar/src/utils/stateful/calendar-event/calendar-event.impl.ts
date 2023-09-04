import {
  CalendarEventInternal,
  EventDuration,
} from './calendar-event.interface'
import { EventId } from '../../../types/event-id'
import CalendarConfigInternal from '../config/calendar-config'

export default class CalendarEventImpl implements CalendarEventInternal {
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined

  constructor(
    private _config: CalendarConfigInternal,
    public id: EventId,
    public time: { start: string; end: string },
    public title?: string,
    public people?: string[],
    public location?: string,
    public description?: string
  ) {}

  get _duration(): EventDuration | undefined {
    return
  }
}

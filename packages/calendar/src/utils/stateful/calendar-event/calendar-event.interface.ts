import { EventId } from '../../../types/event-id'

export type CalendarEventTime = {
  start: string
  end: string
}

export default interface CalendarEventExternal {
  id: EventId
  time: CalendarEventTime
  title?: string
  people?: string[]
  location?: string
  description?: string
}

export enum EventDuration {
  SingleDayTimed = 'single-day-timed',
  SingleDayFullDay = 'single-day-full-day',
  SingleHybridDayTimed = 'single-hybrid-day-timed',
  MultiDayTimed = 'multi-day-timed',
  MultiDayFullDay = 'multi-day-full-day',
}

export interface CalendarEventInternal extends CalendarEventExternal {
  _duration: EventDuration | undefined
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined
}

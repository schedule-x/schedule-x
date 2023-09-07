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
  [key: string]: any
}

export type EventOriginal = CalendarEventExternal & Record<string, unknown>

export interface CalendarEventInternal extends CalendarEventExternal {
  _isSingleDayTimed: boolean
  _isSingleDayFullDay: boolean
  _isSingleHybridDayTimed: boolean
  _isMultiDayTimed: boolean
  _isMultiDayFullDay: boolean

  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined
}

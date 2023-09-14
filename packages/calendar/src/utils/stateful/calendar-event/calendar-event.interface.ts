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
  calendarId?: string
  [key: string]: any
}

export interface CalendarEventInternal extends CalendarEventExternal {
  _isSingleDayTimed: boolean
  _isSingleDayFullDay: boolean
  _isSingleHybridDayTimed: boolean
  _isMultiDayTimed: boolean
  _isMultiDayFullDay: boolean

  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined

  _color: string
}

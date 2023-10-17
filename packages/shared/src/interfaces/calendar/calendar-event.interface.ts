import { EventId } from '../../types/event-id'

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
  // event duration
  _isSingleDayTimed: boolean
  _isSingleDayFullDay: boolean
  _isSingleHybridDayTimed: boolean
  _isMultiDayTimed: boolean
  _isMultiDayFullDay: boolean

  // week time grid
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined

  // week date grid
  _nDaysInGrid: number | undefined

  // month grid
  _nDaysStartingFrom: Record<string, number> // key for week starting on date, value for number of days in week

  _color: string

  _getForeignProperties(): Record<string, unknown>
}

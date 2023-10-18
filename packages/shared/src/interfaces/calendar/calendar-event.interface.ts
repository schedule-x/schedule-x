import { EventId } from '../../types/event-id'
import { EventFragments } from './event-fragments'

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
  _eventFragments: EventFragments

  _color: string

  _getForeignProperties(): Record<string, unknown>
}

import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { BackgroundEvent } from '@schedule-x/shared/src/interfaces/calendar/background-event'

export interface Resource {
  id: string
  name: string
}

export type ResourceDaySlot = {
  date: string
  resource: Resource
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: CalendarEventInternal[]
  backgroundEvents: BackgroundEvent[]
}

/**
 * A week organized by date, then by resource
 * Structure: { [dateString]: { [resourceId]: ResourceDaySlot } }
 */
export type ResourceWeek = Record<string, Record<string, ResourceDaySlot>>

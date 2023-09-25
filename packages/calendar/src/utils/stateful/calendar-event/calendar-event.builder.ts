import {
  CalendarEventInternal,
  CalendarEventTime,
} from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import Builder from '@schedule-x/shared/src/interfaces/builder.interface'
import CalendarEventImpl from './calendar-event.impl'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import CalendarConfigInternal from '../config/calendar-config'

export default class CalendarEventBuilder
  implements Builder<CalendarEventInternal>
{
  private people: string[] | undefined
  private location: string | undefined
  private description: string | undefined
  private title: string | undefined
  private calendarId: string | undefined
  private _foreignProperties: Record<string, unknown> = {}

  constructor(
    private _config: CalendarConfigInternal,
    private id: EventId,
    private time: CalendarEventTime
  ) {}

  build(): CalendarEventInternal {
    return new CalendarEventImpl(
      this._config,
      this.id,
      this.time,
      this.title,
      this.people,
      this.location,
      this.description,
      this.calendarId,
      this._foreignProperties
    )
  }

  withTitle(title: string | undefined): CalendarEventBuilder {
    this.title = title
    return this
  }

  withPeople(people: string[] | undefined): CalendarEventBuilder {
    this.people = people
    return this
  }

  withLocation(location: string | undefined): CalendarEventBuilder {
    this.location = location
    return this
  }

  withDescription(description: string | undefined): CalendarEventBuilder {
    this.description = description
    return this
  }

  withForeignProperties(
    foreignProperties: Record<string, unknown>
  ): CalendarEventBuilder {
    this._foreignProperties = foreignProperties
    return this
  }

  withCalendarId(calendarId: string | undefined): CalendarEventBuilder {
    this.calendarId = calendarId
    return this
  }
}

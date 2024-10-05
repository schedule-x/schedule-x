import {
  CalendarEventInternal,
  CalendarEventOptions,
} from '../../../../interfaces/calendar/calendar-event.interface'
import Builder from '../../../../interfaces/builder.interface'
import CalendarEventImpl from './calendar-event.impl'
import { EventId } from '../../../../types/event-id'
import CalendarConfigInternal from '../../../../interfaces/calendar/calendar-config'

export default class CalendarEventBuilder
  implements Builder<CalendarEventInternal>
{
  private people: string[] | undefined
  private location: string | undefined
  private description: string | undefined
  private title: string | undefined
  private calendarId: string | undefined
  private _foreignProperties: Record<string, unknown> = {}
  private _options: CalendarEventOptions | undefined = undefined
  private _customContent: CalendarEventInternal['_customContent'] = {}

  constructor(
    private _config: CalendarConfigInternal,
    private id: EventId,
    private start: string,
    private end: string
  ) {}

  build(): CalendarEventInternal {
    return new CalendarEventImpl(
      this._config,
      this.id,
      this.start,
      this.end,
      this.title,
      this.people,
      this.location,
      this.description,
      this.calendarId,
      this._options,
      this._customContent,
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

  withOptions(options: CalendarEventOptions | undefined): CalendarEventBuilder {
    this._options = options
    return this
  }

  withCustomContent(
    customContent: CalendarEventInternal['_customContent']
  ): CalendarEventBuilder {
    this._customContent = customContent
    return this
  }
}

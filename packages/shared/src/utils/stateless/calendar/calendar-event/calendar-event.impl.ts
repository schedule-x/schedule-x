import CalendarEventExternal, {
  CalendarEventInternal,
  CalendarEventOptions,
} from '../../../../interfaces/calendar/calendar-event.interface'
import { EventId } from '../../../../types/event-id'
import CalendarConfigInternal from '../../../../interfaces/calendar/calendar-config'
import { toDateString } from '../../time/format-conversion/date-to-strings'
import { timePointsFromString } from '../../time/time-points/string-conversion'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '../../time/format-conversion/string-to-string'
import { EventFragments } from '../../../../interfaces/calendar/event-fragments'
import { DEFAULT_EVENT_COLOR_NAME } from '../../../../values'
import { IANATimezone } from '../../time/tzdb'

export default class CalendarEventImpl implements CalendarEventInternal {
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined
  _maxConcurrentEvents: number | undefined
  _nDaysInGrid: number | undefined
  _createdAt: Date | undefined
  _originalTimezone: IANATimezone | undefined

  constructor(
    private _config: CalendarConfigInternal,
    public id: EventId,
    private _start: Temporal.ZonedDateTime | Temporal.PlainDate,
    private _end: Temporal.ZonedDateTime | Temporal.PlainDate,
    public title?: string,
    public people?: string[],
    public location?: string,
    public description?: string,
    public calendarId?: string,
    public _options: CalendarEventOptions | undefined = undefined,
    public _customContent: CalendarEventInternal['_customContent'] = {},
    private _foreignProperties: Record<string, unknown> = {}
  ) {
    this._originalTimezone =
      this._start instanceof Temporal.ZonedDateTime
        ? (this._start.timeZoneId as IANATimezone)
        : undefined
  }

  get start(): Temporal.ZonedDateTime | Temporal.PlainDate {
    if (this._start instanceof Temporal.PlainDate) {
      return this._start
    }

    return this._start.withTimeZone(this._config.timezone.value)
  }

  set start(value: Temporal.ZonedDateTime | Temporal.PlainDate) {
    this._start =
      value instanceof Temporal.ZonedDateTime
        ? value.withTimeZone(this._originalTimezone as IANATimezone)
        : value
  }

  get end(): Temporal.ZonedDateTime | Temporal.PlainDate {
    if (this._end instanceof Temporal.PlainDate) {
      return this._end
    }

    return this._end.withTimeZone(this._config.timezone.value)
  }

  set end(value: Temporal.ZonedDateTime | Temporal.PlainDate) {
    this._end =
      value instanceof Temporal.ZonedDateTime
        ? value.withTimeZone(this._originalTimezone as IANATimezone)
        : value
  }

  get _isSingleDayTimed(): boolean {
    if (
      this.start instanceof Temporal.PlainDate ||
      this.end instanceof Temporal.PlainDate
    )
      return false

    const localStartDate = dateFromDateTime(this.start.toString())
    const localEndDate = dateFromDateTime(this.end.toString())

    return localStartDate === localEndDate
  }

  get _isSingleDayFullDay(): boolean {
    const startDate = dateFromDateTime(this.start.toString())
    const endDate = dateFromDateTime(this.end.toString())

    return (
      startDate === endDate &&
      this.start instanceof Temporal.PlainDate &&
      this.end instanceof Temporal.PlainDate
    )
  }

  get _isMultiDayTimed(): boolean {
    if (
      this.start instanceof Temporal.PlainDate ||
      this.end instanceof Temporal.PlainDate
    )
      return false

    const startDate = dateFromDateTime(this.start.toString())
    const endDate = dateFromDateTime(this.end.toString())

    return startDate !== endDate
  }

  get _isMultiDayFullDay(): boolean {
    const startDate = dateFromDateTime(this.start.toString())
    const endDate = dateFromDateTime(this.end.toString())

    return (
      this.start instanceof Temporal.PlainDate &&
      this.end instanceof Temporal.PlainDate &&
      startDate !== endDate
    )
  }

  get _isSingleHybridDayTimed(): boolean {
    if (!this._config.isHybridDay) return false
    if (
      this.start instanceof Temporal.PlainDate ||
      this.end instanceof Temporal.PlainDate
    )
      return false

    const startDate = dateFromDateTime(this.start.toString())
    const endDate = dateFromDateTime(this.end.toString())
    const endDateMinusOneDay = toDateString(
      Temporal.PlainDate.from(endDate).subtract({ days: 1 })
    )
    if (startDate !== endDate && startDate !== endDateMinusOneDay) return false

    const dayBoundaries = this._config.dayBoundaries.value
    const eventStartTimePoints = timePointsFromString(
      timeFromDateTime(this.start.toString())
    )
    const eventEndTimePoints = timePointsFromString(
      timeFromDateTime(this.end.toString())
    )

    const eventIsFullyInFirstDayOfBoundary =
      eventEndTimePoints > eventStartTimePoints && startDate === endDate

    return (
      (eventStartTimePoints >= dayBoundaries.start &&
        (eventEndTimePoints <= dayBoundaries.end ||
          eventIsFullyInFirstDayOfBoundary)) ||
      (eventStartTimePoints < dayBoundaries.end &&
        eventEndTimePoints <= dayBoundaries.end)
    )
  }

  get _color(): string {
    if (
      this.calendarId &&
      this._config.calendars.value &&
      this.calendarId in this._config.calendars.value
    ) {
      return this._config.calendars.value[this.calendarId].colorName
    }

    return DEFAULT_EVENT_COLOR_NAME
  }

  _getForeignProperties(): Record<string, unknown> {
    return this._foreignProperties
  }

  _getExternalEvent(): CalendarEventExternal {
    return {
      id: this.id,
      start: this._start,
      end: this._end,
      title: this.title,
      people: this.people,
      location: this.location,
      description: this.description,
      calendarId: this.calendarId,
      _options: this._options,
      ...this._getForeignProperties(),
    }
  }

  _eventFragments: EventFragments = {}
}

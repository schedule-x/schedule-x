import CalendarEventExternal, {
  CalendarEventInternal,
  CalendarEventOptions,
} from '../../../../interfaces/calendar/calendar-event.interface'
import { EventId } from '../../../../types/event-id'
import CalendarConfigInternal from '../../../../interfaces/calendar/calendar-config'
import {
  dateStringRegex,
  dateTimeStringRegex,
} from '../../time/validation/regex'
import { toJSDate } from '../../time/format-conversion/format-conversion'
import { toDateString } from '../../time/format-conversion/date-to-strings'
import { timePointsFromString } from '../../time/time-points/string-conversion'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '../../time/format-conversion/string-to-string'
import { EventFragments } from '../../../../interfaces/calendar/event-fragments'
import { DEFAULT_EVENT_COLOR_NAME } from '../../../../values'

export default class CalendarEventImpl implements CalendarEventInternal {
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined
  _nDaysInGrid: number | undefined

  constructor(
    private _config: CalendarConfigInternal,
    public id: EventId,
    public start: string,
    public end: string,
    public title?: string,
    public people?: string[],
    public location?: string,
    public description?: string,
    public calendarId?: string,
    public _options: CalendarEventOptions = {},
    private _foreignProperties: Record<string, unknown> = {}
  ) {}

  get _isSingleDayTimed(): boolean {
    return (
      dateTimeStringRegex.test(this.start) &&
      dateTimeStringRegex.test(this.end) &&
      dateFromDateTime(this.start) === dateFromDateTime(this.end)
    )
  }

  get _isSingleDayFullDay(): boolean {
    return (
      dateStringRegex.test(this.start) &&
      dateStringRegex.test(this.end) &&
      this.start === this.end
    )
  }

  get _isMultiDayTimed(): boolean {
    return (
      dateTimeStringRegex.test(this.start) &&
      dateTimeStringRegex.test(this.end) &&
      dateFromDateTime(this.start) !== dateFromDateTime(this.end)
    )
  }

  get _isMultiDayFullDay(): boolean {
    return (
      dateStringRegex.test(this.start) &&
      dateStringRegex.test(this.end) &&
      this.start !== this.end
    )
  }

  get _isSingleHybridDayTimed(): boolean {
    if (!this._config.isHybridDay) return false
    if (
      !dateTimeStringRegex.test(this.start) ||
      !dateTimeStringRegex.test(this.end)
    )
      return false

    const startDate = dateFromDateTime(this.start)
    const endDate = dateFromDateTime(this.end)
    const endDateMinusOneDay = toDateString(
      new Date(toJSDate(endDate).getTime() - 86400000)
    )
    if (startDate !== endDate && startDate !== endDateMinusOneDay) return false

    const dayBoundaries = this._config.dayBoundaries
    const eventStartTimePoints = timePointsFromString(
      timeFromDateTime(this.start)
    )
    const eventEndTimePoints = timePointsFromString(timeFromDateTime(this.end))

    return (
      (eventStartTimePoints >= dayBoundaries.start &&
        (eventEndTimePoints <= dayBoundaries.end ||
          eventEndTimePoints > eventStartTimePoints)) ||
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
      start: this.start,
      end: this.end,
      title: this.title,
      people: this.people,
      location: this.location,
      description: this.description,
      calendarId: this.calendarId,
      ...this._getForeignProperties(),
    }
  }

  _eventFragments: EventFragments = {}
}

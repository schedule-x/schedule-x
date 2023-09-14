import { CalendarEventInternal } from './calendar-event.interface'
import { EventId } from '../../../types/event-id'
import CalendarConfigInternal from '../config/calendar-config'
import {
  dateStringRegex,
  dateTimeStringRegex,
} from '../../../../../../shared/utils/stateless/time/validation/regex'
import { toJSDate } from '../../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '../../../../../../shared/utils/stateless/time/format-conversion/date-to-strings'
import { timePointsFromString } from '../../stateless/time/time-points/string-conversion'
import {
  dateFromDateTime,
  timeFromDateTime,
} from '../../../../../../shared/utils/stateless/time/format-conversion/string-to-string'

export default class CalendarEventImpl implements CalendarEventInternal {
  _previousConcurrentEvents: number | undefined
  _totalConcurrentEvents: number | undefined

  constructor(
    private _config: CalendarConfigInternal,
    public id: EventId,
    public time: { start: string; end: string },
    public title?: string,
    public people?: string[],
    public location?: string,
    public description?: string,
    public calendarId?: string,
    private _foreignProperties: Record<string, unknown> = {}
  ) {}

  get _isSingleDayTimed(): boolean {
    return (
      dateTimeStringRegex.test(this.time.start) &&
      dateTimeStringRegex.test(this.time.end) &&
      dateFromDateTime(this.time.start) === dateFromDateTime(this.time.end)
    )
  }

  get _isSingleDayFullDay(): boolean {
    return (
      dateStringRegex.test(this.time.start) &&
      dateStringRegex.test(this.time.end) &&
      this.time.start === this.time.end
    )
  }

  get _isMultiDayTimed(): boolean {
    return (
      dateTimeStringRegex.test(this.time.start) &&
      dateTimeStringRegex.test(this.time.end) &&
      dateFromDateTime(this.time.start) !== dateFromDateTime(this.time.end)
    )
  }

  get _isMultiDayFullDay(): boolean {
    return (
      dateStringRegex.test(this.time.start) &&
      dateStringRegex.test(this.time.end) &&
      this.time.start !== this.time.end
    )
  }

  get _isSingleHybridDayTimed(): boolean {
    if (!this._config.isHybridDay) return false
    if (
      !dateTimeStringRegex.test(this.time.start) ||
      !dateTimeStringRegex.test(this.time.end)
    )
      return false

    const startDate = dateFromDateTime(this.time.start)
    const endDate = dateFromDateTime(this.time.end)
    const endDateMinusOneDay = toDateString(
      new Date(toJSDate(endDate).getTime() - 86400000)
    )
    if (startDate !== endDate && startDate !== endDateMinusOneDay) return false

    const dayBoundaries = this._config.dayBoundaries
    const eventStartTimePoints = timePointsFromString(
      timeFromDateTime(this.time.start)
    )
    const eventEndTimePoints = timePointsFromString(
      timeFromDateTime(this.time.end)
    )

    return (
      (eventStartTimePoints >= dayBoundaries.start &&
        (eventEndTimePoints <= dayBoundaries.end ||
          eventEndTimePoints > eventStartTimePoints)) ||
      (eventStartTimePoints < dayBoundaries.end &&
        eventEndTimePoints <= dayBoundaries.end)
    )
  }
}

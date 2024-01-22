import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { AugmentedEvent } from '../../types/augmented-event.interface'
import { EventRRuleOptions } from '../../types/event-rrule-options'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { calculateMinutesDifference } from '../stateless/calculate-minutes-difference'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { RecurrenceSetBuilder } from './recurrence-set-builder'
import { toRRuleDatetime } from '../stateless/to-rrule-datetime'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { replaceTimeInDatetime } from '../stateless/replace-time-in-datetime'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { addMinutesToDatetime } from '../stateless/add-minutes-to-datetime'
import { addDays } from '@schedule-x/shared/src'

export class EventRecurrenceCreator {
  constructor(private $app: CalendarAppSingleton) {}

  createEventRecurrenceGroup(
    event: AugmentedEvent,
    rruleOptions: EventRRuleOptions
  ) {
    if (dateTimeStringRegex.test(event.start)) {
      event._durationInMinutes = calculateMinutesDifference(
        event.start,
        event.end
      )
    } else {
      event._durationInDays = calculateDaysDifference(event.start, event.end)
    }

    const allEvents = new RecurrenceSetBuilder(toRRuleDatetime(event.start))
      .rrule(rruleOptions)
      .exdate(event._getForeignProperties().exdate as string[] | undefined)
      .build()
      .all()
      .map(this.offsetToTimezone)
      .slice(1) // skip the first index because it's the original event
      .map((date) => this.createEventFromRRule(date, event))
    this.$app.calendarEvents.list.value.push(...allEvents)
  }

  private createEventFromRRule(
    date: Date,
    originalEvent: AugmentedEvent
  ): AugmentedEvent {
    const copiedEvent: AugmentedEvent = deepCloneEvent(originalEvent, this.$app)
    const isDateTime = dateTimeStringRegex.test(copiedEvent.start)
    const eventStart = isDateTime
      ? replaceTimeInDatetime(
          toDateTimeString(date),
          timeFromDateTime(copiedEvent.start)
        )
      : toDateString(date)

    copiedEvent._isRecurrenceCopy = true
    copiedEvent.start = eventStart
    copiedEvent.end = isDateTime
      ? addMinutesToDatetime(eventStart, originalEvent._durationInMinutes!)
      : addDays(eventStart, originalEvent._durationInDays!)

    return copiedEvent
  }

  private offsetToTimezone(date: Date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
  }
}

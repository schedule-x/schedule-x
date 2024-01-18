import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { AugmentedEvent } from './types/augmented-event.interface'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { calculateMinutesDifference } from './utils/stateless/calculate-minutes-difference'
import { addMinutesToDatetime } from './utils/stateless/add-minutes-to-datetime'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { replaceTimeInDatetime } from './utils/stateless/replace-time-in-datetime'
import { EventRRule } from './utils/stateful/event-rrule'
import {
  toJSDate,
  toJSDateUTC,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { addDays } from '@schedule-x/shared/src'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { addTzOffsetToDatetime } from './utils/stateless/add-tz-offset-to-datetime'
import { toRRuleDatetime } from './utils/stateless/to-rrule-datetime'
import { datetime } from 'rrule'

class EventRecurrencePlugin implements PluginBase {
  name = 'event-recurrence'

  private $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createEventRecurrenceGroups($app)
  }

  private createEventRecurrenceGroups($app: CalendarAppSingleton) {
    $app.calendarEvents.list.value.forEach((event) => {
      if (event._getForeignProperties().rrule) {
        this.createEventRecurrenceGroup(event)
      }
    })
  }

  private createEventRecurrenceGroup(event: AugmentedEvent) {
    const rrule = event._getForeignProperties().rrule as EventRRule
    event._durationInMinutes = calculateMinutesDifference(
      event.start,
      event.end
    )
    // let dtstart = toJSDateUTC(addTzOffsetToDatetime(event.start))
    // const dtstart = toRRuleDatetime(event.start)
    const dtstart = toRRuleDatetime(addTzOffsetToDatetime(event.start))
    // let dtstart = toJSDate(addTzOffsetToDatetime((event.start)))
    console.log('dtstart', dtstart)
    const allEvents = rrule
      ._createRecurrenceSet(dtstart)
      .all()
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
    console.log(eventStart)

    copiedEvent.start = eventStart
    copiedEvent.end = isDateTime
      ? addMinutesToDatetime(eventStart, originalEvent._durationInMinutes!)
      : addDays(eventStart, originalEvent._durationInMinutes! / 60 / 24)

    return copiedEvent
  }
}

export const createEventRecurrencePlugin = () => new EventRecurrencePlugin()

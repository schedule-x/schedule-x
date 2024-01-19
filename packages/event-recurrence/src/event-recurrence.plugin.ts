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
import { addDays } from '@schedule-x/shared/src'
import { timeFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { toRRuleDatetime } from './utils/stateless/to-rrule-datetime'
import { EventRRuleOptions } from './types/event-rrule-options'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'

class EventRecurrencePlugin implements PluginBase {
  name = 'event-recurrence'

  private $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createEventRecurrenceGroups($app)
  }

  private createEventRecurrenceGroups($app: CalendarAppSingleton) {
    $app.calendarEvents.list.value.forEach((event) => {
      const rruleOptions = event._getForeignProperties().rrule as
        | EventRRuleOptions
        | undefined
      if (rruleOptions) {
        this.createEventRecurrenceGroup(event, rruleOptions)
      }
    })
  }

  private createEventRecurrenceGroup(
    event: AugmentedEvent,
    rruleOptions: EventRRuleOptions
  ) {
    const rrule = new EventRRule(rruleOptions)

    if (dateTimeStringRegex.test(event.start)) {
      event._durationInMinutes = calculateMinutesDifference(
        event.start,
        event.end
      )
    } else {
      event._durationInDays = calculateDaysDifference(event.start, event.end)
    }

    const allEvents = rrule
      ._createRecurrenceSet(toRRuleDatetime(event.start))
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

    copiedEvent.start = eventStart
    copiedEvent.end = isDateTime
      ? addMinutesToDatetime(eventStart, originalEvent._durationInMinutes!)
      : addDays(eventStart, originalEvent._durationInDays!)

    return copiedEvent
  }

  private offsetToTimezone(date: Date) {
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() + offset * 60 * 1000)
  }
}

export const createEventRecurrencePlugin = () => new EventRecurrencePlugin()

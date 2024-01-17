import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { AugmentedEvent } from './augmented-event/augmented-event.interface'
import { RRule, RRuleSet } from 'rrule'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { calculateMinutesDifference } from './utils/stateless/calculate-minutes-difference'
import { addMinutesToDatetime } from './utils/stateless/add-minutes-to-datetime'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { replaceTimeInDatetime } from './utils/stateless/replace-time-in-datetime'

class EventRecurrencePlugin implements PluginBase {
  name = 'event-recurrence'

  private $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    $app.calendarEvents.list.value = $app.calendarEvents.list.value.map(
      this.createEventProxy.bind(this)
    )
  }

  private createEventProxy(event: CalendarEventInternal) {
    let augmentedEvent: AugmentedEvent = event

    if (event._getForeignProperties().rrule) {
      augmentedEvent = this.createEventGroup(event)
    }

    return new Proxy(augmentedEvent, {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver)
      },
      set(target, prop, value, receiver) {
        if (prop === 'start' || prop === 'end') {
          console.log(`changed ${prop} from ${target[prop]} to ${value}`)
          // todo: update the time of all events in the group
        }

        return Reflect.set(target, prop, value, receiver)
      },
    })
  }

  private createEventGroup(event: AugmentedEvent): AugmentedEvent {
    const eventGroupId = randomStringId()
    const rrule = event._getForeignProperties().rrule as RRule | RRuleSet
    event._durationInMinutes = calculateMinutesDifference(
      event.start,
      event.end
    )
    const allEvents = rrule
      .all()
      .map((date) => this.createEventFromRRule(date, eventGroupId, event))
    console.log(allEvents)

    return event
  }

  private createEventFromRRule(
    date: Date,
    groupId: string,
    originalEvent: AugmentedEvent
  ): AugmentedEvent {
    const copiedEvent: AugmentedEvent = deepCloneEvent(originalEvent, this.$app)
    copiedEvent._groupId = groupId
    const startDateTime = dateTimeStringRegex.test(copiedEvent.start)
      ? replaceTimeInDatetime(
          toDateTimeString(date),
          copiedEvent.start.substring(11)
        )
      : toDateString(date)

    copiedEvent.start = startDateTime
    copiedEvent.end = addMinutesToDatetime(
      startDateTime,
      originalEvent._durationInMinutes!
    )

    return copiedEvent
  }

  destroy(): void {
    console.log(1)
  }
}

export const createEventRecurrencePlugin = () => new EventRecurrencePlugin()

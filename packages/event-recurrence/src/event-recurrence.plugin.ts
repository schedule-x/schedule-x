import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { AugmentedEvent } from './augmented-event/augmented-event.interface'
import { RRule, RRuleSet } from 'rrule'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { toIntegers } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { toDateString } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'

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
    const allEvents = rrule
      .all()
      .map((date) =>
        this.createEventFromRRule(rrule, date, eventGroupId, event)
      )
    console.log(allEvents)

    return event
  }

  private createEventFromRRule(
    rrule: RRule | RRuleSet,
    date: Date,
    groupId: string,
    originalEvent: AugmentedEvent
  ): AugmentedEvent {
    const copiedEvent = deepCloneEvent(originalEvent, this.$app)
    copiedEvent._groupId = groupId
    copiedEvent.start = toDateString(date)
    copiedEvent.end = toDateString(date)

    return copiedEvent
  }

  destroy(): void {
    console.log(1)
  }
}

export const createEventRecurrencePlugin = () => new EventRecurrencePlugin()

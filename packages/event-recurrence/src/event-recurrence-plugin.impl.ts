/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import {
  addDays,
  addMinutes,
  CalendarAppSingleton,
} from '@schedule-x/shared/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../recurrence/src'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import {
  parseRFC5545ToSX,
  parseSXToRFC5545,
} from '../../recurrence/src/parsers/rrule/parse-rrule'
import { dateTimeStringRegex } from '@schedule-x/shared/src/utils/stateless/time/validation/regex'
import { getDurationInMinutes } from '../../recurrence/src/rrule/utils/stateless/duration-in-minutes'
import { calculateDaysDifference } from '@schedule-x/drag-and-drop/src/utils/stateless/days-difference'
import { AugmentedEvent } from './types/augmented-event'
import { DndUpdater } from './util/stateful/dnd-updater'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence
  private $app: CalendarAppSingleton | null = null

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createRecurrenceForEvents()
  }

  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ): void {
    const { updatedEvent, recurrenceSet } = new DndUpdater(
      this.$app as CalendarAppSingleton
    ).update(eventId, oldEventStart, newEventStart)

    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...this.createRecurrencesForEvent(updatedEvent, recurrenceSet.getRrule()),
    ]
  }

  private createRecurrenceForEvents() {
    const recurrencesToCreate: CalendarEventInternal[] = []
    const $app = this.$app as CalendarAppSingleton

    $app.calendarEvents.list.value.forEach((event) => {
      const rrule = event._getForeignProperties().rrule as string | undefined

      if (rrule) {
        recurrencesToCreate.push(
          ...this.createRecurrencesForEvent(event, rrule)
        )
      }
    })

    $app.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...recurrencesToCreate,
    ]
  }

  private createRecurrencesForEvent(
    calendarEvent: CalendarEventInternal,
    rrule: string
  ) {
    const recurrenceSet = new RecurrenceSet({
      dtstart: parseSXToRFC5545(calendarEvent.start),
      dtend: parseSXToRFC5545(calendarEvent.end),
      rrule,
    })

    return recurrenceSet
      .getRecurrences()
      .slice(1) // skip the first occurrence because this is the original event
      .map((recurrence) => {
        const eventCopy: AugmentedEvent = deepCloneEvent(
          calendarEvent,
          this.$app as CalendarAppSingleton
        )
        eventCopy.start = recurrence.start
        eventCopy.end = recurrence.end
        eventCopy.isCopy = true
        return eventCopy
      })
  }
}

export const createEventRecurrencePlugin = (): EventRecurrencePlugin => {
  return new EventRecurrencePluginImpl() as EventRecurrencePlugin
}

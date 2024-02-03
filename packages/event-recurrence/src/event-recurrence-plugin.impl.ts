/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { RecurrenceSet } from '../../recurrence/src'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { parseSXToRFC5545 } from '../../recurrence/src/parsers/rrule/parse-rrule'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence
  private $app: CalendarAppSingleton | null = null

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createRecurrenceForEvents()
  }

  updateRecurrenceDND(
    eventId: EventId,
    newEventStart: string,
    newEventEnd: string
  ): void {}

  private createRecurrenceForEvents() {
    const recurrencesToCreate: CalendarEventInternal[] = []
    const $app = this.$app as CalendarAppSingleton

    $app.calendarEvents.list.value.forEach((event) => {
      const rrule = event._getForeignProperties().rrule as string | undefined

      if (rrule) {
        recurrencesToCreate.push(...this.createRecurrenceForEvent(event, rrule))
      }
    })

    $app.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...recurrencesToCreate,
    ]
  }

  private createRecurrenceForEvent(
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
        const eventCopy = deepCloneEvent(
          calendarEvent,
          this.$app as CalendarAppSingleton
        )
        eventCopy.start = recurrence.start
        eventCopy.end = recurrence.end
        return eventCopy
      })
  }
}

export const createEventRecurrencePlugin = (): EventRecurrencePlugin => {
  return new EventRecurrencePluginImpl() as EventRecurrencePlugin
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DndUpdater } from './util/stateful/dnd-updater'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import { createRecurrencesForEvent } from './util/stateless/create-recurrences-for-event'
import { ResizeUpdater } from './util/stateful/resize-updater'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { parseSXToRFC5545 } from '@schedule-x/recurrence/src/parsers/rrule/parse-rrule'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name: string = PluginName.EventRecurrence

  private $app: CalendarAppSingleton | null = null
  private range: DateRange | null = null

  /**
   * Must be before render, because if we run it onRender, we will create recurrences for the recurrences that were added
   * by people using the callbacks.beforeRender hook to add events.
   * */
  beforeRender($app: CalendarAppSingleton): void {
    this.$app = $app
    this.range = $app.calendarState.range.value
    this.createRecurrencesForEvents()
  }

  onRangeUpdate(range: DateRange): void {
    this.range = range
    this.removeAllEventRecurrences()
    this.createRecurrencesForEvents()
  }

  get eventsFacade(): EventsFacade {
    console.warn(
      '[Schedule-X warning]: the eventsFacade is deprecated and will be removed in v2. Please use the createEventsServicePlugin function from @schedule-x/event-recurrence instead. Docs: https://schedule-x.dev/docs/calendar/plugins/recurrence'
    )
    if (!this.$app)
      throw new Error(
        'Plugin not yet initialized. The events facade is not intended to add the initial events. For adding events upon rendering, add them directly to the configuration object passed to `createCalendar`, or `useCalendarApp` if you are using the React component'
      )

    return new EventsFacadeImpl(this.$app)
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

  updateRecurrenceOnResize(
    eventId: EventId,
    oldEventEnd: string,
    newEventEnd: string
  ): void {
    const updatedEvent = new ResizeUpdater(
      this.$app as CalendarAppSingleton
    ).update(eventId, oldEventEnd, newEventEnd)

    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...this.createRecurrencesForEvent(
        updatedEvent,
        updatedEvent._getForeignProperties().rrule as string
      ),
    ]
  }

  private createRecurrencesForEvents() {
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
    // if there is no count or until in the rrule, set an until date to range.end but in rfc string format
    if (!rrule.includes('COUNT') && !rrule.includes('UNTIL')) {
      if (this.range) {
        if (!rrule.endsWith(';')) rrule += ';'
        rrule += `UNTIL=${parseSXToRFC5545(this.range.end)};`
      } else {
        console.warn(
          'No date range found in event recurrence plugin. Aborting creation of recurrences to prevent infinite recursion.'
        )
        return []
      }
    }

    return createRecurrencesForEvent(
      this.$app as CalendarAppSingleton,
      calendarEvent,
      rrule
    )
  }

  private removeAllEventRecurrences() {
    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value.filter((event) => !event.isCopy),
    ]
  }
}

export const createEventRecurrencePlugin = () => {
  return definePlugin(
    'eventRecurrence',
    new EventRecurrencePluginImpl() as EventRecurrencePlugin
  )
}

import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DndUpdater } from './util/stateful/dnd-updater'
import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import { EventsFacadeImpl } from './util/stateful/events-facade'
import {
  createRecurrencesForBackgroundEvent,
  createRecurrencesForEvent,
} from './util/stateless/create-recurrences-for-event'
import { ResizeUpdater } from './util/stateful/resize-updater'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { AugmentedBackgroundEvent } from './types/augmented-event'
import { batch } from '@preact/signals'
import { rruleStringToJS } from '@schedule-x/recurrence/src/parsers/rrule/parse-rrule'
import { parseBydaySpec } from '@schedule-x/recurrence/src/rrule/utils/stateless/weekday-utils'

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
    this.createRecurrencesForBackgroundEvents()
  }

  onRangeUpdate(range: DateRange): void {
    this.range = range
    this.removeAllEventRecurrences()
    batch(() => {
      this.createRecurrencesForEvents()
      this.createRecurrencesForBackgroundEvents()
    })
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
    oldEventStart: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventStart: Temporal.ZonedDateTime | Temporal.PlainDate
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
    oldEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate
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
      const exdate = event._getForeignProperties().exdate as
        | string[]
        | undefined

      if (rrule && this.validateRrule(event, rrule)) {
        recurrencesToCreate.push(
          ...this.createRecurrencesForEvent(event, rrule, exdate)
        )
      }
    })

    $app.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value,
      ...recurrencesToCreate,
    ]
  }

  private createRecurrencesForBackgroundEvents() {
    const recurrencesToCreate: AugmentedBackgroundEvent[] = []
    const $app = this.$app as CalendarAppSingleton

    $app.calendarEvents.backgroundEvents.value.forEach((event) => {
      const rrule = event.rrule
      const exdate = event.exdate

      if (rrule && this.range && this.validateRrule(event, rrule)) {
        recurrencesToCreate.push(
          ...createRecurrencesForBackgroundEvent(
            $app,
            event,
            rrule,
            this.range,
            exdate
          )
        )
      }
    })

    $app.calendarEvents.backgroundEvents.value = [
      ...$app.calendarEvents.backgroundEvents.value,
      ...recurrencesToCreate,
    ]
  }

  /**
   * The "DTSTART" property value SHOULD match the pattern of the recurrence rule, if
   * specified. The recurrence set generated with a "DTSTART" property value that
   * doesn't match the pattern of the rule is undefined.
   *
   * https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5.1
   */
  private validateRrule(
    event: CalendarEventInternal | AugmentedBackgroundEvent,
    rrule: string
  ): boolean {
    const rruleOptions = rruleStringToJS(rrule)

    const logValidationFailure = (message: string) => {
      if ('id' in event) {
        console.warn(
          `[Schedule-X warning]: Recurrence set could not be created for event with id ${event.id}, because ${message}`
        )
      } else {
        console.warn(
          `[Schedule-X warning]: Recurrence set could not be created for background event with start ${event.start.toString()}, because ${message}`
        )
      }
    }

    if (rruleOptions.bymonthday) {
      if (event.start.day !== rruleOptions.bymonthday) {
        logValidationFailure("rrule pattern doesn't match event.start")
        return false
      }
    }

    if (rruleOptions.byday && rruleOptions.byday.length > 0) {
      for (const daySpec of rruleOptions.byday) {
        if (!parseBydaySpec(daySpec)) {
          logValidationFailure(`rrule contains invalid BYDAY value ${daySpec}`)
          return false
        }
      }
    }

    return true
  }

  private createRecurrencesForEvent(
    calendarEvent: CalendarEventInternal,
    rrule: string,
    exdate?: string[] | undefined
  ) {
    if (!this.range) {
      console.warn(
        'No date range found in event recurrence plugin. Aborting creation of recurrences to prevent infinite recursion.'
      )
      return []
    }

    return createRecurrencesForEvent(
      this.$app as CalendarAppSingleton,
      calendarEvent,
      rrule,
      this.range,
      exdate
    )
  }

  private removeAllEventRecurrences() {
    this.$app!.calendarEvents.list.value = [
      ...this.$app!.calendarEvents.list.value.filter((event) => !event.isCopy),
    ]
    this.$app!.calendarEvents.backgroundEvents.value = [
      ...this.$app!.calendarEvents.backgroundEvents.value.filter(
        (event) => !(event as AugmentedBackgroundEvent).isCopy
      ),
    ]
  }
}

export const createEventRecurrencePlugin = () => {
  return definePlugin(
    'eventRecurrence',
    new EventRecurrencePluginImpl() as EventRecurrencePlugin
  )
}

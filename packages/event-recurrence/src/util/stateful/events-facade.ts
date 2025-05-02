import EventsFacade from '@schedule-x/shared/src/utils/stateful/events-facade/events-facade.interface'
import CalendarEventExternal from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { externalEventToInternal } from '@schedule-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { createRecurrencesForEvent } from '../stateless/create-recurrences-for-event'
import { AugmentedEvent } from '../../types/augmented-event'

export class EventsFacadeImpl implements EventsFacade {
  constructor(private $app: CalendarAppSingleton) {}

  set(events: CalendarEventExternal[]): void {
    const newEventsList = []
    for (const event of events) {
      const newEvent = externalEventToInternal(event, this.$app.config)
      newEventsList.push(newEvent)
      const rrule = newEvent._getForeignProperties().rrule
      if (
        rrule &&
        typeof rrule === 'string' &&
        this.$app.calendarState.range.value
      ) {
        newEventsList.push(
          ...createRecurrencesForEvent(
            this.$app,
            newEvent,
            rrule,
            this.$app.calendarState.range.value
          )
        )
      }
    }

    this.$app.calendarEvents.list.value = newEventsList
  }

  add(event: CalendarEventExternal): void {
    const newEvent = externalEventToInternal(event, this.$app.config)
    newEvent._createdAt = new Date()
    const newEventsList = [...this.$app.calendarEvents.list.value, newEvent]
    const rrule = newEvent._getForeignProperties().rrule

    if (
      rrule &&
      typeof rrule === 'string' &&
      this.$app.calendarState.range.value
    ) {
      newEventsList.push(
        ...createRecurrencesForEvent(
          this.$app,
          newEvent,
          rrule,
          this.$app.calendarState.range.value
        )
      )
    }
    this.$app.calendarEvents.list.value = newEventsList
  }

  get(id: EventId): CalendarEventExternal | undefined {
    return (this.$app.calendarEvents.list.value as AugmentedEvent[])
      .find((event) => event.id === id && !event.isCopy)
      ?._getExternalEvent()
  }

  getAll(): CalendarEventExternal[] {
    return this.$app.calendarEvents.list.value
      .filter((event) => !event.isCopy)
      .map((event) => event._getExternalEvent())
  }

  remove(id: EventId): void {
    this.$app.calendarEvents.list.value =
      this.$app.calendarEvents.list.value.filter((event) => event.id !== id)
  }

  update(event: CalendarEventExternal): void {
    this.removeOriginalAndCopiesForId(event.id)
    const updatedEvent = externalEventToInternal(event, this.$app.config)
    const copiedEvents = [...this.$app.calendarEvents.list.value, updatedEvent]
    const rrule = (updatedEvent as AugmentedEvent)._getForeignProperties().rrule
    const exdate = (updatedEvent as AugmentedEvent)._getForeignProperties()
      .exdate as string[] | undefined
    if (
      rrule &&
      typeof rrule === 'string' &&
      this.$app.calendarState.range.value
    ) {
      copiedEvents.push(
        ...createRecurrencesForEvent(
          this.$app,
          updatedEvent,
          rrule,
          this.$app.calendarState.range.value,
          exdate
        )
      )
    }
    this.$app.calendarEvents.list.value = copiedEvents
  }

  private removeOriginalAndCopiesForId(eventId: EventId) {
    this.$app.calendarEvents.list.value =
      this.$app.calendarEvents.list.value.filter((e) => e.id !== eventId)
  }
}

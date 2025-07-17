import PluginBase from '../plugin.interface'
import { EventId } from '../../types/event-id'
import EventsFacade from '../../utils/stateful/events-facade/events-facade.interface'


export interface EventRecurrencePlugin extends PluginBase<string> {
  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventStart: Temporal.ZonedDateTime | Temporal.PlainDate
  ): void

  updateRecurrenceOnResize(
    eventId: EventId,
    oldEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate,
    newEventEnd: Temporal.ZonedDateTime | Temporal.PlainDate
  ): void

  eventsFacade: EventsFacade
}

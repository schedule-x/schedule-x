import PluginBase from '../plugin.interface'
import { EventId } from '../../types/event-id'
import EventsFacade from '../../utils/stateful/events-facade/events-facade.interface'

export interface EventRecurrencePlugin extends PluginBase {
  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ): void

  eventsFacade: EventsFacade
}

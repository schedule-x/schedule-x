import PluginBase from '../plugin.interface'
import { EventId } from '../../types/event-id'

export interface EventRecurrencePlugin extends PluginBase {
  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ): void
}

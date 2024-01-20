import PluginBase from '../plugin.interface'
import { EventId } from '../../types/event-id'

export interface EventRecurrencePlugin extends PluginBase {
  updateRecurrenceGroup(
    eventId: EventId,
    newEventStart: string,
    newEventEnd: string
  ): void
}

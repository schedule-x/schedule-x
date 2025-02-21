import PluginBase from '../plugin.interface'
import { EventId } from '../../types/event-id'
import EventsFacade from '../../utils/stateful/events-facade/events-facade.interface'

export interface EventRecurrencePlugin extends PluginBase<string> {
  updateRecurrenceDND(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ): void

  updateRecurrenceOnResize(
    eventId: EventId,
    oldEventEnd: string,
    newEventEnd: string
  ): void

  addDaysToRRuleForEvent(id: EventId, nDays: number): string

  eventsFacade: EventsFacade
}

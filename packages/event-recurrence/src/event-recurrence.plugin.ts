import { CalendarAppSingleton } from '@schedule-x/shared/src'
import { EventRRuleOptions } from './types/event-rrule-options'
import { EventRecurrencePlugin } from '@schedule-x/shared/src/interfaces/event-recurrence/event-recurrence-plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import { EventId } from '@schedule-x/shared/src/types/event-id'
import { EventRecurrenceCreator } from './utils/stateful/event-recurrence-creator'
import { RecurrenceSetDndUpdater } from './utils/stateful/recurrence-set-dnd-updater'

class EventRecurrencePluginImpl implements EventRecurrencePlugin {
  name = PluginName.EventRecurrence

  private $app!: CalendarAppSingleton

  init($app: CalendarAppSingleton): void {
    this.$app = $app
    this.createEventRecurrenceGroups($app)
  }

  updateRecurrenceGroup(
    eventId: EventId,
    oldEventStart: string,
    newEventStart: string
  ) {
    new RecurrenceSetDndUpdater(
      this.$app,
      eventId,
      oldEventStart,
      newEventStart
    ).update()
  }

  private createEventRecurrenceGroups($app: CalendarAppSingleton) {
    $app.calendarEvents.list.value.forEach((event) => {
      const rruleOptions = event._getForeignProperties().rrule as
        | EventRRuleOptions
        | undefined
      if (rruleOptions) {
        new EventRecurrenceCreator($app).createEventRecurrenceGroup(
          event,
          rruleOptions
        )
      }
    })
  }
}

export const createEventRecurrencePlugin = () => new EventRecurrencePluginImpl()
